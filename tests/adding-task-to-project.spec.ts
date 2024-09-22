import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

const sampleProjectData = {
    title: 'title test',
    description: 'description test',
    dueDate: '2024-10-01'
};

const sampleTaskName = "new test task";

test.beforeEach(async ({ page }) => {
    await page.goto('https://zarress.github.io/Project-Manager-App/');

    const pm = new PageManager(page);

    await pm.onNoProjectSelectedPage().clickCreateNewProjectButton();
    await pm.onCreateNewProjectPage().createNewProject(sampleProjectData.title, sampleProjectData.description, sampleProjectData.dueDate);
    await pm.onSidebarMenu().navigateToProjectDetails(sampleProjectData.title);
});

test('Add new task', async ({page}) => {
    const pm = new PageManager(page);

    await pm.onProjectDetailsPage().fillTaskNameField(sampleTaskName);
    await pm.onProjectDetailsPage().clickAddTaskButton();
    
    await expect(pm.onProjectDetailsPage().noTasksInfo).not.toBeVisible();
    await expect(pm.onProjectDetailsPage().taskNumber).toContainText("1");
    await expect(pm.onProjectDetailsPage().taskName).toContainText(sampleTaskName);

    await page.reload();
    await pm.onSidebarMenu().navigateToProjectDetails(sampleProjectData.title);

    await expect(pm.onProjectDetailsPage().noTasksInfo).not.toBeVisible();
    await expect(pm.onProjectDetailsPage().taskNumber).toContainText("1");
    await expect(pm.onProjectDetailsPage().taskName).toContainText(sampleTaskName);
});

test('Cannot add new task with empty name or whitespace', async ({page}) => {
    const pm = new PageManager(page);

    await pm.onProjectDetailsPage().clickAddTaskButton();

    await expect(pm.onProjectDetailsPage().taskItems).not.toBeVisible();
    await expect(pm.onProjectDetailsPage().noTasksInfo).toBeVisible();

    await pm.onProjectDetailsPage().fillTaskNameField(' ');
    await pm.onProjectDetailsPage().clickAddTaskButton();

    await expect(pm.onProjectDetailsPage().taskItems).not.toBeVisible();
    await expect(pm.onProjectDetailsPage().noTasksInfo).toBeVisible();
});