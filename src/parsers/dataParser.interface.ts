import Ability from "../bossRunners/ability.interface";

export default interface DataParser<T> {
    parse(data: any, bossName: string, ability: Ability): T[];
}