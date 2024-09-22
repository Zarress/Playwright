import { Page, expect, Locator } from '@playwright/test';

export class ProjectDetails {
    private readonly page: Page;
    readonly projectTitle: Locator;
    readonly projectDueDate: Locator;
    readonly projectDescription: Locator;
    readonly deleteProjectButton: Locator;
    readonly confirmDeletingButton: Locator;
    readonly cancelDeletingButton: Locator;
    readonly taskNameField: Locator;
    readonly addTaskButton: Locator;
    readonly taskItems: Locator;
    readonly noTasksInfo: Locator;
    readonly taskNumber: Locator;
    readonly taskName: Locator;
    readonly taskClearButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.projectTitle = this.page.locator('main > section h1');
        this.projectDueDate = this.page.locator('main > section > div > p').first();
        this.projectDescription = this.page.locator('main > section > div > p').nth(1);
        this.deleteProjectButton = this.page.getByRole('button', { name: 'Delete project' });
        this.confirmDeletingButton = this.page.getByRole('button', { name: 'Yes' });
        this.cancelDeletingButton = this.page.getByRole('button', { name: 'No' });
        this.taskNameField = this.page.getByPlaceholder('Enter task name ...');
        this.addTaskButton = this.page.getByRole('button', { name: '+ Add Task' });
        this.taskItems = this.page.locator('section ul li');
        this.noTasksInfo = this.page.getByText('No tasks added yet');
        this.taskNumber = this.page.locator('section ul li p').first();
        this.taskName = this.page.locator('section ul li p').nth(1);
        this.taskClearButton = page.locator('section ul li button');
    }

    async getFormattedDate(date: string) {
        return new Date (date).toLocaleDateString('pl-PL', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }

    // Actions
    async clickDeleteProjectButton() {
        await this.deleteProjectButton.click();
    }
    async clickConfirmDeletingButton() {
        await this.confirmDeletingButton.click();
    }

    async clickCancelDeletingButton() {
        await this.cancelDeletingButton.click();
    }

    async fillTaskNameField (taskName: string) {
        await this.taskNameField.fill(taskName);
    }

    async clickAddTaskButton () {
        await this.addTaskButton.click();
    }

    async clickClearTaskButton () {
        await this.taskClearButton.click();
    }
}