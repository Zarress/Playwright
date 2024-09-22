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
    await pm.onProjectDetailsPage().fillTaskNameField(sampleTaskName);
    await pm.onProjectDetailsPage().clickAddTaskButton();
});

test('Clear added task', async ({page}) => {
    const pm = new PageManager(page);
    await pm.onProjectDetailsPage().clickClearTaskButton();

    await expect(pm.onProjectDetailsPage().taskItems).not.toBeVisible();
    await expect(pm.onProjectDetailsPage().noTasksInfo).toBeVisible();
});