import WarcraftLogsClient from "../apiClients/warcraftLogsClient";
import {Difficulty} from "./difficulty.enum";

export async function getAllFightIds(reportCode: string, difficulty: Difficulty, warcraftLogsClient: WarcraftLogsClient): Promise<number[]> {
    const response = await warcraftLogsClient.fetchAllFightIds(reportCode, difficulty);
    const fights = response.data.reportData.report.fights;
    return fights.map((fight: any) => fight.id);
}

