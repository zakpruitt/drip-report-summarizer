import Ability from "../ability.interface";
import Boss from "../bossRunner.base.";

const lavaWave: Ability = {id: 403543, name: "Lava Wave"};

export default class RashokRunner extends Boss {
    constructor() {
        super("Rashok, the Elder", [
            lavaWave
        ]);
    }
}