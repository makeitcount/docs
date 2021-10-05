import React, { PropsWithChildren } from "react";
import supertokens from "supertokens-website";
import { recursiveMap } from "../utils";
import { getSaasApp } from "../api/saas/app";
import { MOCK_ENABLED } from "../constants";

type Props = {};

type State = {
    sessionState: "NOT_EXISTS" | "UNKNOWN"
} | {
    sessionState: "EXISTS",
    uri: string, key: string
};

export default class CoreInjector extends React.PureComponent<PropsWithChildren<Props>, State> {

    isUnmounting = false;

    constructor(props: PropsWithChildren<Props>) {
        super(props);
        this.state = {
            sessionState: "UNKNOWN"
        };
    }

    render() {
        if (this.state.sessionState === "UNKNOWN") {
            return recursiveMap(this.props.children, (c) => {
                if (typeof c === "string") {
                    c = c.split("^{coreInjector_uri}").join('"",');
                    c = c.split("^{coreInjector_api_key}").join('""')
                    c = c.split("^{coreInjector_api_key_commented}").join('')
                }
                return c;
            });
        } else if (this.state.sessionState === "EXISTS") {
            let uri = this.state.uri;
            let key = this.state.key;
            return recursiveMap(this.props.children, (c) => {
                if (typeof c === "string") {
                    c = c.split("^{coreInjector_uri}").join(`"${uri}",`);
                    c = c.split("^{coreInjector_api_key}").join(`"${key}"`)
                    c = c.split("^{coreInjector_api_key_commented}").join('')
                }
                return c;
            });
        }
        return recursiveMap(this.props.children, (c) => {
            if (typeof c === "string") {
                c = c.split("^{coreInjector_uri}").join('"https://try.supertokens.io", // This is hosted for demo purposes. You can use this, but make sure to change it to your core instance URI eventually.');
                c = c.split("^{coreInjector_api_key}").join('"IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE"')
                c = c.split("^{coreInjector_api_key_commented}").join('// ')
            }
            return c;
        });
    }

    async componentDidMount() {
        if (typeof window != 'undefined') {
            if (!((await supertokens.doesSessionExist()) || MOCK_ENABLED)) {
                if (this.isUnmounting) {
                    return;
                }
                this.setState(oldState => {
                    return {
                        ...oldState,
                        sessionState: "NOT_EXISTS"
                    };
                })
            } else {
                let coreDetails = await this.fetchCoreDetails();
                if (this.isUnmounting) {
                    return;
                }
                if (coreDetails === undefined) {
                    this.setState(oldState => {
                        return {
                            ...oldState,
                            sessionState: "NOT_EXISTS"
                        };
                    })
                } else {
                    this.setState(oldState => {
                        return {
                            ...oldState,
                            sessionState: "EXISTS",
                            ...coreDetails,
                        }
                    })
                }
            }
        }
    }

    componentWillUnmount() {
        this.isUnmounting = true;
    }

    fetchCoreDetails = async (): Promise<{
        uri: string, key: string
    } | undefined> => {
        let app = await getSaasApp();
        if (this.isUnmounting) {
            return undefined;
        }
        if (app.exists && app.devDeployment.connectionInfo !== undefined) {
            return {
                uri: app.devDeployment.connectionInfo.host,
                key: app.devDeployment.connectionInfo.apiKey,
            }
        }
        return undefined;
    }
}