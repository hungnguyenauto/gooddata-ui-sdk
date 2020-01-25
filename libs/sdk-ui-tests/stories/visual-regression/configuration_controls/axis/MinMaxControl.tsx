// (C) 2020 GoodData Corporation

import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import MinMaxControl from "@gooddata/sdk-ui/dist/internal/components/configurationControls/MinMaxControl";
import { InternalIntlWrapper } from "@gooddata/sdk-ui/dist/internal/utils/internalIntlProvider";
import "@gooddata/sdk-ui/styles/internal/css/config_panel.css";
import { ConfigurationControls } from "../../_infra/storyGroups";
import { withMultipleScreenshots, withScreenshot } from "../../_infra/backstopWrapper";

const wrapperStyle = { width: 400, height: 800, padding: "1em 1em" };
const mobileViewport = [{ label: "mobile-view", height: 800, width: 480 }];
const german = "de-DE";

storiesOf(`${ConfigurationControls}/Axis/MinMaxControls`, module)
    .add("disabled", () => {
        return withScreenshot(
            <div style={wrapperStyle} className="screenshot-target">
                <InternalIntlWrapper>
                    <MinMaxControl
                        isDisabled={true}
                        basePath={""}
                        pushData={action("")}
                        properties={{}}
                        propertiesMeta={{}}
                    />
                </InternalIntlWrapper>
            </div>,
        );
    })
    .add("enabled", () => {
        return withMultipleScreenshots(
            <div style={wrapperStyle} className="screenshot-target">
                <InternalIntlWrapper>
                    <MinMaxControl
                        isDisabled={false}
                        basePath={""}
                        pushData={action("")}
                        properties={{}}
                        propertiesMeta={{}}
                    />
                </InternalIntlWrapper>
            </div>,
            {
                closed: {},
                opened: {
                    clickSelectors: [".s-configuration-subsection-properties-axis-scale", ".gd-input-field"],
                    postInteractionWait: 200,
                },
                "opened-mobile": {
                    clickSelectors: [".s-configuration-subsection-properties-axis-scale", ".gd-input-field"],
                    postInteractionWait: 200,
                    viewports: mobileViewport,
                },
            },
        );
    })
    .add("enabled - locale", () => {
        return withMultipleScreenshots(
            <div style={wrapperStyle} className="screenshot-target">
                <InternalIntlWrapper locale={german}>
                    <MinMaxControl
                        isDisabled={false}
                        basePath={""}
                        pushData={action("")}
                        properties={{}}
                        propertiesMeta={{}}
                    />
                </InternalIntlWrapper>
            </div>,
            {
                closed: {},
                opened: {
                    clickSelectors: [".s-configuration-subsection-properties-axis-scale", ".gd-input-field"],
                    postInteractionWait: 200,
                },
                "opened-mobile": {
                    clickSelectors: [".s-configuration-subsection-properties-axis-scale", ".gd-input-field"],
                    postInteractionWait: 200,
                    viewports: mobileViewport,
                },
            },
        );
    });
