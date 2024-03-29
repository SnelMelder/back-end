import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import axios from 'axios';
import UserInterface from 'interfaces/user.interface';
import getAccessToken from './authService';

require('dotenv').config();



const contractorsGroupId = process.env.CONTRACTORS_SECURITY_GROUP_ID;

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

  public async getContractorsByIds(ids: string[]) {
    const allContractors = await this.getAllContractors();

    const selectedContractors = allContractors.filter((contractor) =>
      ids.includes(contractor.id),
    );

    return selectedContractors;
  }

  public async getSignedInUserInfo(oid: String){
    const url = `https://graph.microsoft.com/v1.0/users/${oid}`
    const config = {
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    };
    const response = await axios.get(url,config);

    const username = response.data.displayName;

    return username;  

  }

  private toModel(msGraphUsers: MicrosoftGraph.User[]): UserInterface[] {
    return msGraphUsers.map((item) => ({
      id: item.id,
      name: item.displayName,
      imageInitials: item.givenName[0] + item.surname[0],
      email: item.userPrincipalName,
    }));
  }
}
