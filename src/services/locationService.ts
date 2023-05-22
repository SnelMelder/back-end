import LocationModel from '../models/location';
import LocationInterface from '../interfaces/location.interface';

export default class LocationService {
  private location = LocationModel;

  public getById = async (id: string) => this.location.findOne({ _id: id });

  public getAllActiveLocations = async () =>
    this.location.find({ active: true });

  public getAllLocations = async () => this.location.find();

  public create = async (newLocation: LocationInterface) =>
    this.location.create(newLocation);

  public update = async (updateLocation: LocationInterface) =>
    this.location.findOneAndUpdate({ _id: updateLocation._id }, updateLocation);

  public delete = async (id: String) => {
    const locationToDelete = await this.location.findById(id);
    locationToDelete.active = false;
    return this.location.findOneAndUpdate({ _id: id }, locationToDelete);
  };
}
