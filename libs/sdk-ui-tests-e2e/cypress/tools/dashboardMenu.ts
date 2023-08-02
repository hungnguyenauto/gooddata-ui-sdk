// (C) 2021-2022 GoodData Corporation

export class DashboardMenu {
    getButtonElement() {
        return cy.get(".s-header-options-button");
    }

    toggle() {
        this.getButtonElement().should("be.visible").click();
        return this;
    }

    private getDropdownItemElement(optionLabel: string) {
        return cy.get(".gd-header-menu-overlay").find(".gd-list-item").contains(optionLabel);
    }

    clickOption(optionLabel: string) {
        this.getDropdownItemElement(optionLabel)
            .invoke("removeAttr", "target")
            .should("not.have.class", "is-disabled")
            .click();
        return this;
    }

    hasOption(optionLabel: string, expect = true) {
        this.getDropdownItemElement(optionLabel).should(expect ? "be.visible" : "not.exist");
        return this;
    }

    optionItemNotExist(optionLabel: string) {
        this.getDropdownItemElement(optionLabel).should("not.exist");
    }
}
