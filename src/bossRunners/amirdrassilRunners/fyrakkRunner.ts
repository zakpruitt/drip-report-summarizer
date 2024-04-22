import Boss from "../bossRunner.base.";
import Ability from "../ability.interface";

const wildfire: Ability = { id: 420422, name: "Wildfire" };
const blaze: Ability = { id: 417789, name: "Blaze" };

export default class FyrakkRunner extends Boss {
    constructor() {
        super("Fyrakk", [
            wildfire,
            blaze
        ]);
    }
}
