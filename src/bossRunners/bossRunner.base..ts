import Ability from "./ability.interface";
import WarcraftLogsClient from "../apis/warcraftLogsClient";

export default abstract class Boss {
    name: string;
    abilities: Ability[];

    protected constructor(name: string, abilities: Ability[]) {
        this.name = name;
        this.abilities = abilities;
    }

    async fetchDamageTaken(reportCode: string, fightIDs: number[], warcraftLogsClient: WarcraftLogsClient): Promise<any[]> {
        const results = [];
        for (const ability of this.abilities) {
            const data = await warcraftLogsClient.fetchDamageTakenReport(reportCode, ability.id, "DamageTaken", fightIDs);
            results.push({
                ability: ability.name,
                data: data,
            });
        }
        return results;
    }

}
