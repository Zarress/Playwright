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
    const onCreateNewProjectPage = new CreateNewProject(page);
    const onSidebarMenu = new SidebarMenu(page);

    await onNoProjectSelectedPage.clickCreateNewProjectButton();
    await onCreateNewProjectPage.createNewProject(sampleProjectData.title, sampleProjectData.description, sampleProjectData.dueDate);
    await onSidebarMenu.navigateToProjectDetails(sampleProjectData.title);
});

test('Delete project', async ({page}) => {
    const onProjectDetailsPage = new ProjectDetails(page);
    const onSidebarMenu = new SidebarMenu(page);

    await onProjectDetailsPage.clickDeleteProjectButton();
    await onProjectDetailsPage.clickConfirmDeletingButton();
    
    await expect(onSidebarMenu.getProjectLocator(sampleProjectData.title)).not.toBeVisible();

    await page.reload();
  
    await expect(onSidebarMenu.getProjectLocator(sampleProjectData.title)).not.toBeVisible();
});

test('Cancel deleting project', async ({page}) => {
    const onProjectDetailsPage = new ProjectDetails(page);
    const onSidebarMenu = new SidebarMenu(page);

    await onProjectDetailsPage.clickDeleteProjectButton();
    await onProjectDetailsPage.clickCancelDeletingButton();
    await expect(onSidebarMenu.projectItems).toContainText(sampleProjectData.title);
});