import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import axios from 'axios';
import UserInterface from 'interfaces/user.interface';
import getAccessToken from './authService';

const contractorsGroupId = '0bb825d4-c0da-4b81-993d-ac18b1c0d08a';

export default class UserService {
  public async getAllContractors() {
    const url = `https://graph.microsoft.com/v1.0/groups/${contractorsGroupId}/members`;
    const config = {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    };

    const response = await axios.get(url, config);

    const userData: MicrosoftGraph.User[] = response.data.value;

    const users = this.toModel(userData);

    return users;
  }

  private toModel(msGraphUsers: MicrosoftGraph.User[]): UserInterface[] {
    return msGraphUsers.map((item) => ({
      id: item.id,
      name: item.displayName,
      imageInitials: item.givenName[0] + item.surname[0],
    }));
  }
}
