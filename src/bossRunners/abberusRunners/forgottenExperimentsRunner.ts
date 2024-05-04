import Ability from "../ability.interface";
import Boss from "../bossRunner.base.";

const infusedExplosion: Ability = {id: 407302, name: "Infused Explosion"};

export default class ForgottenExperimentsRunner extends Boss {
    constructor() {
        super("The Forgotten Experiments", [
            infusedExplosion
        ]);
    }
}