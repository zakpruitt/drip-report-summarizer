import Ability from "../ability.interface";
import Boss from "../bossRunner.base.";

const volcanicHeart: Ability = {id: 410953, name: "Volcanic Heart"};

export default class EchoRunner extends Boss {
    constructor() {
        super("Echo of Neltharion", [
            volcanicHeart
        ]);
    }
}