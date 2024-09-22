import { test, expect } from '@playwright/test';
import { CreateNewProject } from '../page-objects/createNewProject';
import { NoProjectSelected } from '../page-objects/noProjectSelected';
import { ProjectDetails } from '../page-objects/projectDetails';
import { SidebarMenu } from '../page-objects/sidebarMenu';

const sampleProjectData = {
    title: 'title test',
    description: 'description test',
    dueDate: '2024-10-01'
};

const sampleTaskName = "new test task";

test.beforeEach(async ({ page }) => {
    await page.goto('https://zarress.github.io/Project-Manager-App/');

    const onNoProjectSelectedPage = new NoProjectSelected(page);
    const onCreateNewProjectPage = new CreateNewProject(page);
    const onSidebarMenu = new SidebarMenu(page);
    const onProjectDetailsPage = new ProjectDetails(page);

    await onNoProjectSelectedPage.clickCreateNewProjectButton();
    await onCreateNewProjectPage.createNewProject(sampleProjectData.title, sampleProjectData.description, sampleProjectData.dueDate);
    await onSidebarMenu.navigateToProjectDetails(sampleProjectData.title);
    await onProjectDetailsPage.fillTaskNameField(sampleTaskName);
    await onProjectDetailsPage.clickAddTaskButton();
});

test('Clear added task', async ({page}) => {
    const onProjectDetailsPage = new ProjectDetails(page);
    await onProjectDetailsPage.clickClearTaskButton();

    await expect(onProjectDetailsPage.taskItems).not.toBeVisible();
    await expect(onProjectDetailsPage.noTasksInfo).toBeVisible();
});