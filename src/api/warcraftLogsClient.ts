import axios, {AxiosInstance} from 'axios';
import OpenAuthClient from "./openAuthClient";
import {wclGraphqlUrl} from "../config/env";
import path from "node:path";
import {readFileSync} from "node:fs";
import gql from "graphql-tag";

class WarcraftLogsClient {
    private client: AxiosInstance;
    private openAuthClient: OpenAuthClient;

    constructor(openAuthClient: OpenAuthClient) {
        this.openAuthClient = openAuthClient;
        this.client = axios.create({
            baseURL: wclGraphqlUrl,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        this.client.interceptors.request.use(async (config) => {
            if (!config.headers.Authorization) {
                const token = await this.openAuthClient.getAccessToken();
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, error => Promise.reject(error));
    }

    private loadQuery(file: string): any {
        let filePath = path.join(__dirname, 'config/queries', file);
        if (process.env.NODE_ENV !== 'production') {
            filePath = path.join(__dirname, '../../src/config/queries', file);
        }
        const query = readFileSync(filePath, 'utf8');
        return gql`${query}`;
    }


    public async fetchDamageTakenReport(reportCode: string, sourceID: number, fightIDs: number[]): Promise<any> {
        const query = this.loadQuery('fetchDamageTakenFromAbility.graphql');
        const variables = { reportCode, sourceID, fightIDs, dataType: 'DamageTaken', killType: 'Wipes' };
        return await this.query(query.loc.source.body, variables);  // `query.loc.source.body` gets the string value if using graphql-tag
    }

    private async query(query: string, variables: any): Promise<any> {
        try {
            const response = await this.client.post('', { query, variables });
            return response.data.data;
        } catch (error) {
            console.error('Error making API call', error);
            throw new Error('API call failed');
        }
    }

}
