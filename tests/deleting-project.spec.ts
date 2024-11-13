import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { simpleProjectData } from '../test-data/projectTestData';

test.beforeEach(async ({ page }) => {
    await page.goto('https://zarress.github.io/Project-Manager-App/');

    const pm = new PageManager(page);

    await pm.onNoProjectSelectedPage.clickCreateNewProjectButton();
    await pm.onCreateNewProjectPage.createNewProject(simpleProjectData.title, simpleProjectData.description, simpleProjectData.dueDate);
    await pm.onSidebarMenu.navigateToProjectDetails(simpleProjectData.title);
});

test('Delete project', async ({page}) => {
    const pm = new PageManager(page);

    await pm.onProjectDetailsPage.clickDeleteProjectButton();
    await pm.onProjectDetailsPage.clickConfirmDeletingButton();
    
    await expect(pm.onSidebarMenu.getProjectLocator(simpleProjectData.title)).not.toBeVisible();

    await page.reload();
  
    await expect(pm.onSidebarMenu.getProjectLocator(simpleProjectData.title)).not.toBeVisible();
});

test('Cancel deleting project', async ({page}) => {
    const pm = new PageManager(page);

    await pm.onProjectDetailsPage.clickDeleteProjectButton();
    await pm.onProjectDetailsPage.clickCancelDeletingButton();
    await expect(pm.onSidebarMenu.projectItems).toContainText(simpleProjectData.title);
});