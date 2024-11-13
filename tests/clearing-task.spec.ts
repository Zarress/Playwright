import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { simpleProjectData, simpleTaskName } from '../test-data/projectTestData';

test.beforeEach(async ({ page }) => {
    await page.goto('https://zarress.github.io/Project-Manager-App/');

    const pm = new PageManager(page);

    await pm.onNoProjectSelectedPage.clickCreateNewProjectButton();
    await pm.onCreateNewProjectPage.createNewProject(simpleProjectData.title, simpleProjectData.description, simpleProjectData.dueDate);
    await pm.onSidebarMenu.navigateToProjectDetails(simpleProjectData.title);
    await pm.onProjectDetailsPage.fillTaskNameField(simpleTaskName);
    await pm.onProjectDetailsPage.clickAddTaskButton();
});

test('Clear added task', async ({page}) => {
    const pm = new PageManager(page);
    await pm.onProjectDetailsPage.clickClearTaskButton();

    await expect(pm.onProjectDetailsPage.taskItems).not.toBeVisible();
    await expect(pm.onProjectDetailsPage.noTasksInfo).toBeVisible();
});