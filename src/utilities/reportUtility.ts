import WarcraftLogsClient from "../apiClients/warcraftLogsClient";

export async function getAllFightIds(reportCode: string, warcraftLogsClient: WarcraftLogsClient): Promise<number[]> {
    const response = await warcraftLogsClient.fetchAllFightIds(reportCode);
    const fights = response.data.reportData.report.fights;
    return fights.map((fight: any) => fight.id);
}

