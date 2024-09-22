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

test.beforeEach(async ({ page }) => {
    await page.goto('https://zarress.github.io/Project-Manager-App/');

    const onNoProjectSelectedPage = new NoProjectSelected(page);
    await onNoProjectSelectedPage.clickCreateNewProjectButton();
});

test('Add project and check data stored', async ({ page }) => {
    const onCreateNewProjectPage = new CreateNewProject(page);
    const onProjectDetailsPage = new ProjectDetails(page);
    const onSidebarMenu = new SidebarMenu(page);
    
    await onCreateNewProjectPage.createNewProject(sampleProjectData.title, sampleProjectData.description, sampleProjectData.dueDate);

    await expect(onSidebarMenu.projectItems).toContainText(sampleProjectData.title);

    await page.reload();
    await expect(onSidebarMenu.projectItems).toContainText(sampleProjectData.title);

    await onSidebarMenu.navigateToProjectDetails(sampleProjectData.title);

    await expect(onProjectDetailsPage.projectTitle).toContainText(sampleProjectData.title);

    await expect(onProjectDetailsPage.projectDescription).toHaveText(sampleProjectData.description);

    const formattedDate = await onProjectDetailsPage.getFormattedDate(sampleProjectData.dueDate);
    await expect(onProjectDetailsPage.projectDueDate).toContainText(formattedDate);
});

test('Cancel creating new project', async ({ page }) => {
    const onCreateNewProjectPage = new CreateNewProject(page);
    const onNoProjectSelectedPage = new NoProjectSelected(page);

    await onCreateNewProjectPage.cancelCreatingNewProject();

    await expect(onNoProjectSelectedPage.header).toBeVisible();
});

test.describe('Navigation', () => {
    test('From "No Selected Project" page', async ({ page }) => {
        await page.reload();

        const onNoProjectSelectedPage = new NoProjectSelected(page);
        const onCreateNewProjectPage = new CreateNewProject(page);
    
        await onNoProjectSelectedPage.clickCreateNewProjectButton();
    
        await expect(onCreateNewProjectPage.createNewProjectHeader).toBeVisible();
    });

    test('From sidebar menu', async ({ page }) => {
        const onSidebarMenu = new SidebarMenu(page);
        const onCreateNewProjectPage = new CreateNewProject(page);
    
        await onSidebarMenu.navigateToAddNewProject();
    
        await expect(onCreateNewProjectPage.createNewProjectHeader).toBeVisible();
    });
})
