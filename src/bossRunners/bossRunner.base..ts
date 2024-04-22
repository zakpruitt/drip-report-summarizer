import Ability from "./ability.interface";
import WarcraftLogsClient from "../apiClients/warcraftLogsClient";
import DamageTakenParser from "../parsers/damageTakenParser";

export default abstract class Boss {
    bossName: string;
    abilities: Ability[];
    damageTakenParser: DamageTakenParser;

    protected constructor(name: string, abilities: Ability[]) {
        this.bossName = name;
        this.abilities = abilities;
        this.damageTakenParser = new DamageTakenParser();
    }

    async fetchDamageTaken(reportCode: string, fightIDs: number[], warcraftLogsClient: WarcraftLogsClient): Promise<any> {
        const results: { [key: string]: any } = {};
        results[this.bossName] = {};
        for (const ability of this.abilities) {
            const data = await warcraftLogsClient.fetchDamageTakenReport(reportCode, ability.id, "DamageTaken", fightIDs);
            const parsedData = this.damageTakenParser.parse(data);
            results[this.bossName][ability.name] = {
                abilityId: ability.id,
                abilityName: ability.name,
                data: parsedData
            };
        }
        return results;
    }

}
