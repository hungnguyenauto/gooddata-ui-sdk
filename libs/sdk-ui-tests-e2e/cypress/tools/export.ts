// (C) 2022-2023 GoodData Corporation

import { join } from "path";
import { Messages } from "./messages";

const messages = new Messages();

export class Export {
    deleteDownloadFolder(downloadsFolder: string) {
        cy.exec("find . -name " + downloadsFolder + "file");
        cy.exec("cd " + downloadsFolder + " " + "&& rm -rf *");
    }

    expectExportedPDF(filename: string, contents: string) {
        messages.hasSuccessMessage("Export successful.");
        cy.wait(1000); // make sure file is stored in the local
        const downloadsFolder = Cypress.config("downloadsFolder");
        cy.readFile(join(downloadsFolder, filename)).should("exist");
        cy.readPdf(join(downloadsFolder, filename)).then((dataContent) => {
            expect(dataContent).contain(contents);
        });
        // delete download folder before exporting
        this.deleteDownloadFolder(downloadsFolder);
    }
}
