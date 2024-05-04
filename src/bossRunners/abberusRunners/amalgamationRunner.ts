import Ability from "../ability.interface";
import Boss from "../bossRunner.base.";

const lingeringShadows: Ability = {id: 409299, name: "Lingering Shadows"};

export default class AmalgamationRunner extends Boss {
    constructor() {
        super("The Amalgamation Chamber", [
            lingeringShadows
        ]);
    }
}