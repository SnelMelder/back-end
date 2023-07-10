import { Message } from '@microsoft/microsoft-graph-types';
import ReportStatus from '../helpers/enums/reportStatus.enum';
import ReportModel from '../models/report';
import ReportInterface from '../interfaces/report.interface';
import GraphMailService from './mailService';
import InjurySite from '../helpers/enums/injurySite.enum';
import IncidentType from '../helpers/enums/incidentType.enum';
import LocationService from './locationService';
import DamageType from '../helpers/enums/damageType.enum';
import UserService from './userService';
import { response } from 'express';

require('dotenv').config();

const collectorAddress = process.env.COLLECTOR_EMAIL_ADDRESS;
const testerOID = process.env.TESTER_OBJECT_ID;

export default class ReportService {
  private report = ReportModel;

  private mailService = new GraphMailService();

  private userService = new UserService();

  private locationService = new LocationService();

  public getById = async (id: string) =>
    this.report
      .findOne({ _id: id })
      .populate('user')
      .populate('projectLocation');

  public getReportByUserAndStatus = async (userId: string) => {
    // All open reports
    const reports = await this.report
      .find({
        user: userId,
        status: ReportStatus.inProgress || ReportStatus.send,
      })
      .populate('user')
      .populate('projectLocation');

    // Single report which is completed and the last updated
    if (reports === null || reports.length === 0) {
      const lastReport = await this.report
        .findOne({ user: userId, status: ReportStatus.complete })
        .sort('-updatedAt')
        .populate('user')
        .populate('projectLocation');

      return lastReport;
    }
    return reports;
  };

  public getByLocationId = async (locationId: string) =>
    this.report
      .find({ projectLocation: locationId })
      .populate('user')
      .populate('projectLocation');

  public getAll = async () => this.report.find();

  public create = async (newReport: ReportInterface, user: any) => {
    if (this.isTestUser(user)) {
      return newReport;
    }

    const reportDocument = newReport;
    reportDocument.oid = user.oid;
    if (reportDocument.anonymous === true) {
      reportDocument.oid = 'anonieme melding';
    }
    

    const createdReport: ReportInterface = await this.report.create(
      reportDocument,
    );

    this.notifyCollectorAndContractors(createdReport);

    return createdReport;
  };

  private isTestUser = (user: any) => user.oid === testerOID;

  public update = async (updateReport: ReportInterface) =>
    this.report.findOneAndUpdate({ _id: updateReport._id }, updateReport);

  public upload = async (id: String, pathArray: Array<string>) =>
    this.report.findOneAndUpdate({ _id: id }, { pictureList: pathArray });

  public delete = async (id: String) =>
    this.report.findOneAndDelete({ _id: id });

  private notifyCollectorAndContractors = async (report: ReportInterface) => {
    const emailMessage = await this.createEmailMessageFromReport(report);
    this.mailService.sendAsync(emailMessage);
    console.log(
      `Report ${report._id}: Sent 'new report' e-mail to collectors and contractors`,
    );
  };

  private createEmailMessageFromReport = async (
    report: ReportInterface,
  ): Promise<Message> => {
    const project = await this.locationService.getById(
      report.projectLocation.toString(),
    );

    const contractors = await this.userService.getContractorsByIds(
      project.contractors,
    );
    
    let username = 'test'
    try {
      username = await this.userService.getSignedInUserInfo(report.oid);
    } catch (error) {
      username = 'anonieme gebruiker'
    }
    
    const projectName = project.name;
    const incidentTypesString = formatIncidentTypeArray(report.incidentType);
    const damageTypesString = formatDamageTypeArray(report.damageTypes);
    const injurySitesString = formatInjurySiteArray(report.injurySite);
    const dateTimeString = formatDateTime(report.dateTime);

    const imagesHTML = parseImagesToHtml(report.pictureList);

   

    return {
      subject: 'Nieuwe melding via SnelMelder',
      body: {
        contentType: 'html',
        content: `
        <h1>Nieuwe melding</h1>
        <p><b>Melding gemaakt door:</b> ${username}</p>
        <p><b>Type incident:</b> ${incidentTypesString}</p>
        <p><b>Beschrijving overig type incident (indien van toepassing):</b> ${report.incidentTypeAdditionalInfo}</p>
        <p><b>Locatie:</b> ${projectName} </p>
        <p><b>Datum/tijd:</b> ${dateTimeString} </p>
        <p><b>Betrokken personen:</b> ${report.personInvolved}</p>
        <p><b>Getuigen/hulpverleners:</b> ${report.witness}</p>
        <p><b>Soort schade:</b> ${damageTypesString}</p>
        <p><b>Locatie letsel (indien van toepassing):</b> ${injurySitesString}</p>
        <p><b>Aanvullende informatie:</b> ${report.additionalInformation}</p>
        ${imagesHTML}
      `,
      },
      toRecipients: [
        {
          emailAddress: {
            address: collectorAddress,
          },
        },
        ...contractors.map((contractor) => ({
          emailAddress: {
            address: contractor.email,
          },
        })),
      ],
      replyTo: [
        {
          emailAddress: {
            address: collectorAddress,
          },
        },
      ],
    };
  };
}



function formatIncidentTypeArray(incidentTypes: IncidentType[]) {
  return incidentTypes.map((type) => formatIncidentType(type)).join(', ');
}

function formatIncidentType(incidentType: IncidentType) {
  switch (incidentType) {
    case IncidentType.accident:
      return 'Ongeval';
    case IncidentType.dangerousAct:
      return 'Gevaarlijke handeling';
    case IncidentType.dangerousSituation:
      return 'Gevaarijke situatie';
    case IncidentType['near-accident']:
      return 'Bijna ongeval';
    case IncidentType.other:
      return 'Overig';
    default:
      console.warn(`Incident type '${incidentType}' unknown`);
      return incidentType;
  }
}

function formatDamageTypeArray(damageTypes: DamageType[]) {
  return damageTypes.map((type) => formatDamageType(type)).join(', ');
}

function formatDamageType(damageType: DamageType) {
  switch (damageType) {
    case DamageType.environmental:
      return 'Milieuschade';
    case DamageType['external-injury']:
      return 'Uitwendige schade';
    case DamageType['internal-injury']:
      return 'Inwendige schade';
    case DamageType.material:
      return 'Materiële schade';
    case DamageType['no-damage']:
      return 'Geen schade';
    default:
      console.warn(`Damage type '${damageType} unknown'`);
      return damageType;
  }
}

function formatInjurySiteArray(injurySites: InjurySite[]) {
  return injurySites.map((site) => formatInjurySite(site)).join(', ');
}

function formatInjurySite(injurySite: InjurySite) {
  switch (injurySite) {
    case InjurySite.head:
      return 'Hoofd';
    case InjurySite['left-arm']:
      return 'Linkerarm';
    case InjurySite['left-foot']:
      return 'Linkervoet';
    case InjurySite['left-hand']:
      return 'Linkerhand';
    case InjurySite['left-leg']:
      return 'Linkerbeen';
    case InjurySite.neck:
      return 'Nek';
    case InjurySite['right-arm']:
      return 'Rechterarm';
    case InjurySite['right-foot']:
      return 'Rechtervoet';
    case InjurySite['right-hand']:
      return 'Rechterhand';
    case InjurySite['right-leg']:
      return 'Rechterbeen';
    case InjurySite.torso:
      return 'Romp';
    default:
      console.warn(`Injury site '${injurySite}' unknown`);
      return injurySite;
  }
}

function formatDateTime(date: Date) {
  return Intl.DateTimeFormat('NL-nl', {
    timeZone: 'CET',
  }).format(date);
}

function parseImagesToHtml(base64Images: string[]) {
  // console.log(base64Images);
  return base64Images
    .map((base64Image) => parseImageToHtml(base64Image))
    .join('');
}

function parseImageToHtml(base64Image: string) {
  return `<img src="data:image/png;base64,${base64Image}" />`;
}
