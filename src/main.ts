import express from 'express';
import WarcraftLogsClient from "./apiClients/warcraftLogsClient";
import OpenAuthClient from "./apiClients/openAuthClient";
import FyrakkRunner from "./bossRunners/amirdrassilRunners/fyrakkRunner";

import {getAllFightIds} from "./utilities/reportUtility";
import {Difficulty} from "./utilities/difficulty.enum";
import AmalgamationRunner from "./bossRunners/abberusRunners/amalgamationRunner";
import AssaultRunner from "./bossRunners/abberusRunners/assaultRunner";
import EchoRunner from "./bossRunners/abberusRunners/echoRunner";
import ForgottenExperimentsRunner from "./bossRunners/abberusRunners/forgottenExperimentsRunner";
import KazzaraRunner from "./bossRunners/abberusRunners/kazzaraRunner";
import MagmoraxRunner from "./bossRunners/abberusRunners/magmoraxRunner";
import RashokRunner from "./bossRunners/abberusRunners/rashokRunner";
import ZskarnRunner from "./bossRunners/abberusRunners/zskarnRunner";

const oauthClient: OpenAuthClient = new OpenAuthClient();
const apiClient: WarcraftLogsClient = new WarcraftLogsClient(oauthClient);

const kazzaraRunner: KazzaraRunner = new KazzaraRunner();
const amalgamationRunner: AmalgamationRunner = new AmalgamationRunner();
const assaultRunner: AssaultRunner = new AssaultRunner();
const forgottenExperimentsRunner: ForgottenExperimentsRunner = new ForgottenExperimentsRunner();
const rashokRunner: RashokRunner = new RashokRunner();
const zskarnRunner: ZskarnRunner = new ZskarnRunner();
const magmoraxRunner: MagmoraxRunner = new MagmoraxRunner();
const echoRunner: EchoRunner = new EchoRunner();

const fyrakkRunner: FyrakkRunner = new FyrakkRunner();

const app = express();
const port = process.env.PORT || 3000;

// TODO: make an actual api impl with controllers, services, etc. later.
app.get('/damage-taken', async (req, res) => {
    const reportCode = req.query.reportCode as string;
    if (!reportCode) {
        return res.status(400).send({error: 'Report code is required. Please include it in the query parameters.'});
    }

    try {
        const fightIds = await getAllFightIds(reportCode, Difficulty.Mythic, apiClient);
        const kazzaraData = await kazzaraRunner.fetchDamageTaken(reportCode, fightIds, apiClient);
        const amalgamationData = await amalgamationRunner.fetchDamageTaken(reportCode, fightIds, apiClient);
        const assaultData = await assaultRunner.fetchDamageTaken(reportCode, fightIds, apiClient);
        const forgottenExperimentsData = await forgottenExperimentsRunner.fetchDamageTaken(reportCode, fightIds, apiClient);
        const rashokData = await rashokRunner.fetchDamageTaken(reportCode, fightIds, apiClient);
        const zskarnData = await zskarnRunner.fetchDamageTaken(reportCode, fightIds, apiClient);
        const magmoraxData = await magmoraxRunner.fetchDamageTaken(reportCode, fightIds, apiClient);
        const echoData = await echoRunner.fetchDamageTaken(reportCode, fightIds, apiClient);

        const combinedData = {
            ...kazzaraData,
            ...amalgamationData,
            ...assaultData,
            ...forgottenExperimentsData,
            ...rashokData,
            ...zskarnData,
            ...magmoraxData,
            ...echoData
        };
        res.json(combinedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
