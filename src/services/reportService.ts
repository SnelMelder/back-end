import ReportModel from '../models/report';
import ReportInterface from '../interfaces/report.interface';

export default class ReportService {
  private report = ReportModel;

  public getById = async (id: string) => this.report
    .findOne({ _id: id })
    .populate('user')
    .populate('projectLocation');

    public getByLocationId = async (locationId: string) => this.report
    .findOne({ projectLocation: locationId })
    .populate('user')
    .populate('projectLocation');

  public getAll = async () => this.report.find();

  public create = async (newReport: ReportInterface) => this.report.create(newReport);

  public update = async (updateReport: ReportInterface) => this.report
    .findOneAndUpdate(
      { _id: updateReport._id },
      updateReport,
    );

  public delete = async (id: String) => this.report.findOneAndDelete({ _id: id });
}
