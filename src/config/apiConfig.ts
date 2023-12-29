import {prepareApiBaseFromEnv} from "@/utils";

const clients = {
    local: {
        apiBaseURL: "https://devbackend.dayratework.com",
        //apiBaseURL: "http://localhost:3500",
    },
    live: {
        apiBaseURL: "https://devbackend.dayratework.com",
        //apiBaseURL: "http://localhost:3500",
    },
};

const defaultClient = () => clients.live;
const localClient = () => clients.local;

export const apiConfig = {
    root: prepareApiBaseFromEnv(
        localClient().apiBaseURL,
        defaultClient().apiBaseURL
    ),
};