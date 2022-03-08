import ReportModel from '../models/report';
import ReportInterface from '../interfaces/report.interface';

export default class ReportService {
  private report = ReportModel;

  public getById = async (id: string) => this.report.find({ _id: id }).populate('user');

  public getAll = async () => this.report.find();

  public create = async (newReport: ReportInterface) => {
    const report = await this.report.create(newReport);
    await report.save();
    return report;
  };

  public update = async (updateReport: ReportInterface) => {
    const filter = { _id: updateReport._id };
    return this.report.findOneAndUpdate(filter, updateReport);
  };

  public delete = async (id: String) => this.report.findOneAndDelete({ _id: id });
}
