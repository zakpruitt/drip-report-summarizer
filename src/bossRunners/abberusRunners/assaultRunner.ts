import Ability from "../ability.interface";
import Boss from "../bossRunner.base.";

const moltenBarrier: Ability = {id: 409242, name: "Molten Barrier"};

export default class AssaultRunner extends Boss {
    constructor() {
        super("Assault of the Zaqali", [
            moltenBarrier
        ]);
    }
}