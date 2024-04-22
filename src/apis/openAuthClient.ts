import axios from 'axios';
import {wclAuthUrl, wclClientId, wclClientSecret} from "../configs/env";
import OAuthResponse from "./openAuthResponse.interface";

export default class OpenAuthClient {

    async getAccessToken(): Promise<string> {
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', wclClientId);
        params.append('client_secret', wclClientSecret);
        try {
            const response = await axios.post<OAuthResponse>(wclAuthUrl, params);
            return response.data.access_token;
        } catch (error) {
            console.error('Error obtaining access token', error);
            throw new Error('Failed to obtain access token');
        }
    }

}
