// (C) 2021 GoodData Corporation

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable header/header */
/* THIS FILE WAS AUTO-GENERATED USING MOCK HANDLING TOOL; YOU SHOULD NOT EDIT THIS FILE; GENERATE TIME: 2021-05-31T16:27:09.245Z; */
const df_label_product_id_name = require("./metadata/displayForms/label.product.id.name/elements.json");
const df_label_owner_department = require("./metadata/displayForms/label.owner.department/elements.json");
const df_label_owner_region = require("./metadata/displayForms/label.owner.region/elements.json");
const df_label_stage_status = require("./metadata/displayForms/label.stage.status/elements.json");
const df_label_opportunitysnapshot_forecastcategory = require("./metadata/displayForms/label.opportunitysnapshot.forecastcategory/elements.json");
const df_label_stage_name_stagename = require("./metadata/displayForms/label.stage.name.stagename/elements.json");
export const DataSamples = {
    Department: { DirectSales: df_label_owner_department[0], InsideSales: df_label_owner_department[1] },
    ForecastCategory: {
        Exclude: df_label_opportunitysnapshot_forecastcategory[0],
        Include: df_label_opportunitysnapshot_forecastcategory[1],
    },
    ProductName: {
        CompuSci: df_label_product_id_name[0],
        Educationly: df_label_product_id_name[1],
        Explorer: df_label_product_id_name[2],
        GrammarPlus: df_label_product_id_name[3],
        PhoenixSoft: df_label_product_id_name[4],
        TouchAll: df_label_product_id_name[5],
        WonderKid: df_label_product_id_name[6],
    },
    Region: { EastCoast: df_label_owner_region[0], WestCoast: df_label_owner_region[1] },
    StageName: {
        Interest: df_label_stage_name_stagename[0],
        Discovery: df_label_stage_name_stagename[1],
        ShortList: df_label_stage_name_stagename[2],
        RiskAssessment: df_label_stage_name_stagename[3],
        Conviction: df_label_stage_name_stagename[4],
        Negotiation: df_label_stage_name_stagename[5],
        ClosedWon: df_label_stage_name_stagename[6],
        ClosedLost: df_label_stage_name_stagename[7],
    },
    Status: { Lost: df_label_stage_status[0], Open: df_label_stage_status[1], Won: df_label_stage_status[2] },
};
