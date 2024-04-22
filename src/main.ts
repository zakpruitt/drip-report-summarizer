import WarcraftLogsClient from "./apis/warcraftLogsClient";
import OpenAuthClient from "./apis/openAuthClient";

const oauthClient: OpenAuthClient = new OpenAuthClient();
const api: WarcraftLogsClient = new WarcraftLogsClient(oauthClient);

api.fetchDamageTakenReport("dRH2639fMqQDGzCv", 417789, "DamageTaken", [8])
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Failed to fetch the report:", error);
    });


