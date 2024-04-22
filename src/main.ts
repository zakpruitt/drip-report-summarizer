import express from 'express';
import WarcraftLogsClient from "./apiClients/warcraftLogsClient";
import OpenAuthClient from "./apiClients/openAuthClient";
import FyrakkRunner from "./bossRunners/amirdrassilRunners/fyrakkRunner";

import {getAllFightIds} from "./utilities/reportUtility";

const oauthClient: OpenAuthClient = new OpenAuthClient();
const apiClient: WarcraftLogsClient = new WarcraftLogsClient(oauthClient);
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
        const fightIds = await getAllFightIds(reportCode, apiClient);
        const data = await fyrakkRunner.fetchDamageTaken(reportCode, fightIds, apiClient);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
