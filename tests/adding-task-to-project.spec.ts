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

    await onNoProjectSelectedPage.clickCreateNewProjectButton();
    await onCreateNewProjectPage.createNewProject(sampleProjectData.title, sampleProjectData.description, sampleProjectData.dueDate);
    await onSidebarMenu.navigateToProjectDetails(sampleProjectData.title);
});

test('Add new task', async ({page}) => {
    const onProjectDetailsPage = new ProjectDetails(page);
    const onSidebarMenu = new SidebarMenu(page);

    await onProjectDetailsPage.fillTaskNameField(sampleTaskName);
    await onProjectDetailsPage.clickAddTaskButton();
    
    await expect(onProjectDetailsPage.noTasksInfo).not.toBeVisible();
    await expect(onProjectDetailsPage.taskNumber).toContainText("1");
    await expect(onProjectDetailsPage.taskName).toContainText(sampleTaskName);

    await page.reload();
    await onSidebarMenu.navigateToProjectDetails(sampleProjectData.title);

    await expect(onProjectDetailsPage.noTasksInfo).not.toBeVisible();
    await expect(onProjectDetailsPage.taskNumber).toContainText("1");
    await expect(onProjectDetailsPage.taskName).toContainText(sampleTaskName);
});

test('Cannot add new task with empty name or whitespace', async ({page}) => {
    const onProjectDetailsPage = new ProjectDetails(page);

    await onProjectDetailsPage.clickAddTaskButton();

    await expect(onProjectDetailsPage.taskItems).not.toBeVisible();
    await expect(onProjectDetailsPage.noTasksInfo).toBeVisible();

    await onProjectDetailsPage.fillTaskNameField(' ');
    await onProjectDetailsPage.clickAddTaskButton();

    await expect(onProjectDetailsPage.taskItems).not.toBeVisible();
    await expect(onProjectDetailsPage.noTasksInfo).toBeVisible();
});