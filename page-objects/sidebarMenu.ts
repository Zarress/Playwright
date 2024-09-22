import { Page, Locator } from '@playwright/test';

export class SidebarMenu {
    private readonly page: Page
    readonly projectItems: Locator;
    readonly collapseButton: Locator;
    readonly sidebarMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.projectItems = this.page.locator('aside ul li');
        this.collapseButton = page.locator('aside > button');
        this.sidebarMenu = page.locator('aside > div');
    }

    getProjectLocator(projectName: string) {
        return this.page.locator('aside ul li').filter({hasText: projectName});
    }

    // Actions
    async navigateToProjectDetails(projectName: string) {
        await this.getProjectLocator(projectName).click();
    }

    async navigateToAddNewProject() {
        await this.page.locator('aside').getByRole('button', { name: '+ Add Project' }).click();
    }

    async collapseButtonClick() {
        this.collapseButton.click();
    }
}