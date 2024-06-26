import axios, {AxiosInstance} from 'axios';
import OpenAuthClient from "./openAuthClient";
import {environmentLevel, wclGraphqlUrl} from "../configs/env";
import path from "node:path";
import {readFileSync} from "node:fs";
import gql from "graphql-tag";

export default class WarcraftLogsClient {
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
        let filePath = path.join(__dirname, 'configs/queries', file);
        if (environmentLevel !== 'production') {
            filePath = path.join(__dirname, '../../src/configs/queries', file);
        }
        const query = readFileSync(filePath, 'utf8');
        return gql`${query}`;
    }

    public async fetchAllFightIds(reportCode: string): Promise<any> {
        const query = this.loadQuery('fetchAllFightIds.graphql');
        const variables = {reportCode, killType: 'All'};
        return await this.query(query.loc.source.body, variables);
    }

    public async fetchDamageTakenReport(reportCode: string, abilityID: number, dataType: String, fightIDs: number[]): Promise<any> {
        const query = this.loadQuery('fetchDamageTakenFromAbility.graphql');
        const variables = {reportCode, abilityID, fightIDs, dataType, killType: 'All'};
        return await this.query(query.loc.source.body, variables);
    }

    private async query(query: string, variables: any): Promise<any> {
        try {
            const response = await this.client.post('', {query, variables});
            return response.data;
        } catch (error) {
            console.error('Error making API call', error);
            throw new Error('API call failed');
        }
    }

}
