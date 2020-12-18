// (C) 2019-2020 GoodData Corporation
import React, { CSSProperties } from "react";
import { withIntl } from "@gooddata/sdk-ui";
import {
    Typography,
    Dropdown,
    IDropdownProps,
    DropdownList,
    IDropdownListProps,
    DropdownButton,
    IDropdownButtonProps,
} from "@gooddata/sdk-ui-kit";
import { storiesOf } from "@storybook/react";
import { UiKit } from "../../../_infra/storyGroups";
import { wrapWithTheme } from "../../themeWrapper";
import { withScreenshot } from "../../../_infra/backstopWrapper";

import "@gooddata/sdk-ui-kit/styles/css/main.css";

const testItems = Array.from(Array(10)).map((_, i): string => `Item ${i}`);

const itemStyle: CSSProperties = {
    boxSizing: "border-box",
    borderBottom: "1px solid #eee",
    padding: "2px 10px",
};

const testStyle: CSSProperties = {
    padding: "10px 20px",
    borderBottom: "1px solid #eee",
};

const renderDropdown = (
    dropdownProps: Partial<IDropdownProps> = {},
    listProps: Partial<IDropdownListProps<string>> = {},
    buttonProps: Partial<IDropdownButtonProps> = {},
) => (
    <Dropdown
        renderBody={() => (
            <DropdownList
                width={250}
                height={100}
                renderItem={({ item, height, width }) => (
                    <div
                        style={{
                            height,
                            width,
                            ...itemStyle,
                        }}
                    >
                        {item}
                    </div>
                )}
                {...listProps}
            />
        )}
        renderButton={({ openDropdown, isOpen }) => (
            <DropdownButton value="Insights" isOpen={isOpen} onClick={openDropdown} {...buttonProps} />
        )}
        {...dropdownProps}
    />
);

const openDropdownTestHeight = 180;
const openEmptyDropdownTestHeight = 100;
const searchHeight = 40;
const tabsHeight = 40;

const searchProps = {
    showSearch: true,
    searchPlaceholder: "Find...",
};

const testCases: [
    string,
    number?,
    Partial<IDropdownProps>?,
    Partial<IDropdownListProps<string>>?,
    Partial<IDropdownButtonProps>?,
][] = [
    ["Closed"],
    ["Open", openDropdownTestHeight, { openOnInit: true }, { items: testItems }],
    ["Empty", openEmptyDropdownTestHeight, { openOnInit: true }, { items: [] }],
    [
        "With search",
        openDropdownTestHeight + searchHeight,
        { openOnInit: true },
        {
            ...searchProps,
            items: testItems,
        },
    ],
    [
        "With empty search",
        openEmptyDropdownTestHeight + searchHeight,
        { openOnInit: true },
        { ...searchProps, searchString: "Bar chart", items: [] },
    ],
    [
        "With tabs",
        openDropdownTestHeight + searchHeight + tabsHeight,
        { openOnInit: true },
        {
            ...searchProps,
            items: testItems,
            showTabs: true,
            tabs: [{ id: "My insights" }, { id: "All insights" }],
        },
    ],
    ["With large button", undefined, undefined, undefined, { isSmall: false }],
    [
        "With small search field",
        openDropdownTestHeight + searchHeight,
        { openOnInit: true },
        { ...searchProps, items: testItems, searchFieldSize: "small" },
    ],
    ["With button icon", undefined, undefined, undefined, { iconLeft: "icon-magic" }],
];

const DropdownExamples: React.FC = () => {
    return (
        <div className="library-component screenshot-target">
            <div>
                {testCases.map(([testName, testHeight, dropdownProps, listProps, buttonProps], i) => {
                    return (
                        <div
                            key={i}
                            style={{
                                height: testHeight,
                                ...testStyle,
                            }}
                        >
                            <Typography tagName="h2">{testName}</Typography>
                            {renderDropdown(dropdownProps, listProps, buttonProps)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// TODO remove this adhoc translations when NoData component will have own dictionary and dont rely on provided Intl from top
export const customMessages = {
    "gs.noData.noMatchingData": "No matching data",
    "gs.noData.noDataAvailable": "No data available",
};

const WithIntl = withIntl<unknown>(DropdownExamples, undefined, customMessages);

storiesOf(`${UiKit}/Dropdown`, module).add("full-featured", () => withScreenshot(<WithIntl />));
storiesOf(`${UiKit}/Dropdown`, module).add("themed", () => withScreenshot(wrapWithTheme(<WithIntl />)));
