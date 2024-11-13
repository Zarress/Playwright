import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { simpleProjectData, simpleTaskName } from '../test-data/projectTestData';

test.beforeEach(async ({ page }) => {
    await page.goto('https://zarress.github.io/Project-Manager-App/');

    const pm = new PageManager(page);

    await pm.onNoProjectSelectedPage.clickCreateNewProjectButton();
    await pm.onCreateNewProjectPage.createNewProject(simpleProjectData.title, simpleProjectData.description, simpleProjectData.dueDate);
    await pm.onSidebarMenu.navigateToProjectDetails(simpleProjectData.title);
});

test('Add new task', async ({page}) => {
    const pm = new PageManager(page);

    await pm.onProjectDetailsPage.fillTaskNameField(simpleTaskName);
    await pm.onProjectDetailsPage.clickAddTaskButton();
    
    await expect(pm.onProjectDetailsPage.noTasksInfo).not.toBeVisible();
    await expect(pm.onProjectDetailsPage.taskNumber).toContainText("1");
    await expect(pm.onProjectDetailsPage.taskName).toContainText(simpleTaskName);

    await page.reload();
    await pm.onSidebarMenu.navigateToProjectDetails(simpleProjectData.title);

    await expect(pm.onProjectDetailsPage.noTasksInfo).not.toBeVisible();
    await expect(pm.onProjectDetailsPage.taskNumber).toContainText("1");
    await expect(pm.onProjectDetailsPage.taskName).toContainText(simpleTaskName);
});

test('Cannot add new task with empty name or whitespace', async ({page}) => {
    const pm = new PageManager(page);

    await pm.onProjectDetailsPage.clickAddTaskButton();

    await expect(pm.onProjectDetailsPage.taskItems).not.toBeVisible();
    await expect(pm.onProjectDetailsPage.noTasksInfo).toBeVisible();

    await pm.onProjectDetailsPage.fillTaskNameField(' ');
    await pm.onProjectDetailsPage.clickAddTaskButton();

    await expect(pm.onProjectDetailsPage.taskItems).not.toBeVisible();
    await expect(pm.onProjectDetailsPage.noTasksInfo).toBeVisible();
});