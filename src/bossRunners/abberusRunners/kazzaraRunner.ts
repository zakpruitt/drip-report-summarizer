import Ability from "../ability.interface";
import Boss from "../bossRunner.base.";

const rayOfAnguish: Ability = {id: 402207, name: "Ray of Anguish"};

export default class KazzaraRunner extends Boss {
    constructor() {
        super("Kazzara, the Hellforged", [
            rayOfAnguish
        ]);
    }
}