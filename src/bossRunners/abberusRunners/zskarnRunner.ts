import Ability from "../ability.interface";
import Boss from "../bossRunner.base.";

const eliminationProtocol: Ability = {id: 409942, name: "Elimination Protocol"};

export default class ZskarnRunner extends Boss {
    constructor() {
        super("The Vigilant Steward, Zskarn", [
            eliminationProtocol
        ]);
    }
}