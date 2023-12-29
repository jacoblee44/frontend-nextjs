import {env} from "@/config/env";

/**
 * Prepare the development and production api urls
 * @param development {string}
 * @param production {string}
 * @param test {string | null}
 * @constructor
 */
export function prepareApiBaseFromEnv(development: string, production: string, test: string = ''): string {
    if (env.Production) {
        return production;
    } else if (env.Development) {
        return development;
    }

    return test;
}
