import ReportModel from '../models/report';
import ReportInterface from '../interfaces/report.interface';
import ReportStatus from '../helpers/enums/reportStatus.enum';

export default class ReportService {
  private report = ReportModel;

  public getById = async (id: string) => this.report
    .findOne({ _id: id })
    .populate('user')
    .populate('projectLocation');

  public getReportByUserAndStatus = async (userId: string) => {
    // All open reports
    const reports = await this.report
      .find({ user: userId, status: ReportStatus.inProgress || ReportStatus.send })
      .populate('user')
      .populate('projectLocation');

    console.log(reports);

    // Single report which is completed and the last updated
    if (reports === null || reports.length === 0) {
      console.log('in report == null ');
      const lastReport = await this.report.findOne({ user: userId, status: ReportStatus.complete }).sort('-updatedAt')
        .populate('user')
        .populate('projectLocation');

      console.log(`lala${lastReport}`);
      return lastReport;
    }
    return reports;
  };

  public getAll = async () => this.report.find();

  public create = async (newReport: ReportInterface) => this.report.create(newReport);

  public update = async (updateReport: ReportInterface) => this.report
    .findOneAndUpdate(
      { _id: updateReport._id },
      updateReport,
    );

  public delete = async (id: String) => this.report.findOneAndDelete({ _id: id });
}
