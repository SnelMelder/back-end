import axios from 'axios';
import { Message } from '@microsoft/microsoft-graph-types';
import getAccessToken from './authService';

const senderAddress = process.env.SENDER_EMAIL_ADDRESS;

export default class GraphMailService {
  public async sendAsync(emailMessage: Message) {
    try {
      const url = `https://graph.microsoft.com/v1.0/users/${senderAddress}/sendMail`;
      const payload = { message: emailMessage };
      const config = {
        headers: {
          Authorization: `Bearer ${await getAccessToken()}`,
        },
      };

      await axios.post(url, payload, config);
    } catch (error) {
      console.error(error.response.data);
    }
  }
}
