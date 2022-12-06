// (C) 2022 GoodData Corporation

import {
    IAuthenticatedPrincipal,
    IAuthenticationContext,
    IAnalyticalBackend,
    IAuthenticationProvider,
} from "@gooddata/sdk-backend-spi";
import tigerFactory, { TigerAuthProviderBase, TigerTokenAuthProvider } from "../../src";
import { config } from "dotenv";
import invariant from "ts-invariant";

let GlobalBackend: IAnalyticalBackend | undefined;

/*
 * This implementation of authentication provider is used when integrated tests run against mock data.
 *
 * The login itself is not needed in this context: recordings are done against live server while authenticated,
 * the authentication information is not saved anywhere and does not figure in the recordings.
 *
 * The recordings are matched against requests purely based on payload & no auth headers or cookies.
 * There is no state on the wiremock server.
 */
class NoLoginAuthProvider extends TigerAuthProviderBase implements IAuthenticationProvider {
    public async authenticate(context: IAuthenticationContext): Promise<IAuthenticatedPrincipal> {
        await this.obtainCurrentPrincipal(context);

        return this.principal!;
    }
}

function createBackend(): IAnalyticalBackend {
    /*
     * When running on CI, the whole ensemble shares a docker network where the mock backend is aliased as 'bear'.
     *
     * Does not work without the protocol within the `localhost` value.
     */

    let hostname = (process.env.CI && "https://tiger") ?? "https://localhost";
    if (process.env.HOST) {
        hostname = process.env.HOST;
    }
    let port = process.env.HOST ? "" : ":8442";
    let backend = tigerFactory({ hostname: `${hostname}${port}` });
    let authProvider;

    if (process.env.GD_TIGER_REC) {
        const credentials = config();
        invariant(
            credentials.parsed?.TIGER_API_TOKEN,
            "You have started integrated tests in recording mode - this mode requires " +
                "credentials in order to log into platform. The credentials must be stored in .env file located " +
                "in sdk-backend-tiger directory. This a dotenv file and should contain TIGER_API_TOKEN.",
        );
        authProvider = new TigerTokenAuthProvider(credentials.parsed.TIGER_API_TOKEN);
    } else if (process.env.TIGER_API_TOKEN) {
        authProvider = new TigerTokenAuthProvider(process.env.TIGER_API_TOKEN);
    } else {
        authProvider = new NoLoginAuthProvider();
    }

    return backend.withAuthentication(authProvider);
}

export function testBackend(): IAnalyticalBackend {
    if (!GlobalBackend) {
        GlobalBackend = createBackend();
    }

    return GlobalBackend;
}

export function testWorkspace(): string {
    // UI SDK Reference workspace ID
    const workspace: string = process.env.WORKSPACE_ID ?? "4aefdef78922461faeb08c12de183f81";
    return workspace;
}

export function compareJsonDisregardTheOrder(jsonActual: any, jsonExpected: any) {
    if (Object.prototype.toString.call(jsonActual) !== Object.prototype.toString.call(jsonExpected)) {
        return false;
    }

    if (Array.isArray(jsonActual)) {
        if (jsonActual.length !== jsonExpected.length) {
            return false;
        }

        let i = jsonActual.length;
        while (i--) {
            let j = jsonExpected.length;
            let found = false;

            while (!found && j--) {
                if (compareJsonDisregardTheOrder(jsonActual[i], jsonExpected[j])) found = true;
            }

            if (!found) {
                return false;
            }
        }
        return true;
    }

    if (Object.prototype.toString.call(jsonActual) === "[object Object]") {
        for (const key in jsonActual) {
            if (Object.prototype.hasOwnProperty.call(jsonActual, key)) {
                if (!Object.prototype.hasOwnProperty.call(jsonExpected, key)) {
                    return false;
                }

                if (!compareJsonDisregardTheOrder(jsonActual[key], jsonExpected[key])) {
                    return false;
                }
            }
        }

        for (const key in jsonExpected) {
            if (
                Object.prototype.hasOwnProperty.call(jsonExpected, key) &&
                !Object.prototype.hasOwnProperty.call(jsonActual, key)
            ) {
                return false;
            }
        }

        return true;
    }

    return jsonActual === jsonExpected;
}

export async function sanitizeKeyWithNewValue(result: any, key: string, newValue: string) {
    const fixtureContent = JSON.stringify(result);
    const newResult = await JSON.parse(fixtureContent, (k, v) => (k === key ? newValue : v));
    return newResult;
}

function getId(item: any) {
    return item.attribute?.id || item.measure?.id || item.fact?.id || item.dataSet?.id || item.dateAttributes;
}

export async function sanitizeWorkspace(result: any, key: string, newValue: string) {
    const newResult = await sanitizeKeyWithNewValue(result, key, newValue);
    delete newResult.workspace;
    return newResult;
}

export function sortToOder(o: any) {
    return {
        ...o,
        items: o.items
            .sort((a: any, b: any) => {
                return getId(a).localeCompare(getId(b));
            })
            .map((item: any) => {
                return item.attribute
                    ? {
                          ...item,
                          displayForms: item.displayForms.sort((a: any, b: any) => {
                              return a.id.localeCompare(b.id);
                          }),
                          geoPinDisplayForms: item.geoPinDisplayForms.sort((a: any, b: any) => {
                              return a.id.localeCompare(b.id);
                          }),
                          attribute: {
                              ...item.attribute,
                              displayForms: item.attribute.displayForms.sort((a: any, b: any) => {
                                  return a.id.localeCompare(b.id);
                              }),
                          },
                      }
                    : item;
            })
            .map((item: any) => {
                return item.dataSet
                    ? {
                          ...item,
                          dateAttributes: item.dateAttributes.sort((a: any, b: any) => {
                              return a.attribute.id.localeCompare(b.attribute.id);
                          }),
                      }
                    : item;
            }),
    };
}
