import Ability from "../ability.interface";
import Boss from "../bossRunner.base.";

const explosiveMagma: Ability = {id: 411182, name: "Explosive Magma"};

export default class MagmoraxRunner extends Boss {
    constructor() {
        super("Magmorax", [
            explosiveMagma
        ]);
    }
}