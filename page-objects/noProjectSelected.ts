import { Page, Locator } from '@playwright/test';

export class NoProjectSelected {
    private readonly page : Page;
    readonly header: Locator;
    readonly description: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = this.page.getByRole('heading', { name: 'No Project Selected' });
        this.description = this.page.locator('main > section > p');
    }

    async clickCreateNewProjectButton() {
        await this.page.getByRole('button', { name: 'Create new project' }).click();
    }
}