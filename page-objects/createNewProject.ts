import { Page, Locator } from '@playwright/test';

export class CreateNewProject {
    private readonly page: Page
    readonly createNewProjectHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.createNewProjectHeader = this. page.getByRole('heading', { name: 'Creating a New Project' });
    }

    async createNewProject(title: string, description: string, dueDate: string) {

        await this.page.getByLabel('Title').fill(title);
      
        await this.page.getByLabel('Description').fill(description);
      
        await this.page.getByLabel('Due date').fill(dueDate);
        
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async cancelCreatingNewProject() {
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }
}