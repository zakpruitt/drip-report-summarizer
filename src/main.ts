import WarcraftLogsClient from "./apis/warcraftLogsClient";
import OpenAuthClient from "./apis/openAuthClient";
import FyrakkRunner from "./bossRunners/amirdrassilRunners/fyrakkRunner";

const oauthClient: OpenAuthClient = new OpenAuthClient();
const apiClient: WarcraftLogsClient = new WarcraftLogsClient(oauthClient);

const fyrakkRunner: FyrakkRunner = new FyrakkRunner();

fyrakkRunner.fetchDamageTaken("dRH2639fMqQDGzCv", [8], apiClient)
    .then(data => {
        console.log(data)
    });
