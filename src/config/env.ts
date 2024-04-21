import dotenv from 'dotenv';

dotenv.config();

function getEnvVar(key: string): string {
    const value = process.env[key];
    if (value === undefined) {
        throw new Error(`Environment variable ${key} is not set.`);
    }
    return value;
}

export const wclAuthUrl: string = getEnvVar('WARCRAFTLOGS_AUTH_URL');
export const wclGraphqlUrl: string = getEnvVar('WARCRAFTLOGS_GRAPHQL_URL');
export const wclClientId: string = getEnvVar('WARCRAFTLOGS_CLIENT_ID')
export const wclClientSecret: string = getEnvVar('WARCRAFTLOGS_CLIENT_SECRET')