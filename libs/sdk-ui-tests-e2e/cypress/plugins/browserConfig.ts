// (C) 2022-2023 GoodData Corporation

export default ((on) => {
    on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === "firefox") {
            console.log("===========");
            console.log(launchOptions);
            launchOptions.preferences["browser.helperApps.neverAsk.saveToDick"] =
                "application/octet-stream,application/pdf,application/json,text/csv,image/png,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            return launchOptions;
        }
        return launchOptions;
    });
}) as Cypress.PluginConfig;
