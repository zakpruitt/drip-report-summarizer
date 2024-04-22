import DataParser from "./dataParser.interface";
import DamageTakenDTO from "./dtos/damageTakenDto.interface";
import Ability from "../bossRunners/ability.interface";

export default class DamageTakenParser implements DataParser<DamageTakenDTO> {
    parse(data: any, bossName: string, ability: Ability): DamageTakenDTO[] {
        const entries = data?.data?.reportData?.report?.table?.data?.entries;
        if (!entries) {
            console.error("Failed to parse entries from data", data);
            throw new Error("Invalid data structure");
        }

        return entries.map((entry: any) => {
            const totalDamageTaken = entry.sources.reduce((total: number, source: any) => total + source.total, 0);
            return {
                boss: bossName,
                spell: ability.name,
                spellId: ability.id,
                playerName: entry.name,
                playerId: entry.id,
                playerClass: entry.icon,
                damageTakenTotal: totalDamageTaken
            } as DamageTakenDTO;
        });
    }

}
