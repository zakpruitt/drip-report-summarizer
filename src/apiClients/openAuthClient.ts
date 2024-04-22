import axios from 'axios';
import {wclAuthUrl, wclClientId, wclClientSecret} from "../configs/env";

export default class OpenAuthClient {
    private static token: string | null = null;
    private static expiry: number = 0;

    async getAccessToken(): Promise<string> {
        const now = Date.now();
        if (OpenAuthClient.token && OpenAuthClient.expiry > now) {
            return OpenAuthClient.token;
        }

        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', wclClientId);
        params.append('client_secret', wclClientSecret);
        try {
            const response = await axios.post<{ access_token: string, expires_in: number }>(wclAuthUrl, params);
            OpenAuthClient.token = response.data.access_token;
            OpenAuthClient.expiry = now + response.data.expires_in * 1000;
            return OpenAuthClient.token;
        } catch (error) {
            console.error('Error obtaining access token', error);
            throw new Error('Failed to obtain access token');
        }
    }
}
