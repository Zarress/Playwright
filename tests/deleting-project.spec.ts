import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

const sampleProjectData = {
    title: 'title test',
    description: 'description test',
    dueDate: '2024-10-01'
  };

test.beforeEach(async ({ page }) => {
    await page.goto('https://zarress.github.io/Project-Manager-App/');

    const pm = new PageManager(page);

    await pm.onNoProjectSelectedPage().clickCreateNewProjectButton();
    await pm.onCreateNewProjectPage().createNewProject(sampleProjectData.title, sampleProjectData.description, sampleProjectData.dueDate);
    await pm.onSidebarMenu().navigateToProjectDetails(sampleProjectData.title);
});

test('Delete project', async ({page}) => {
    const pm = new PageManager(page);

    await pm.onProjectDetailsPage().clickDeleteProjectButton();
    await pm.onProjectDetailsPage().clickConfirmDeletingButton();
    
    await expect(pm.onSidebarMenu().getProjectLocator(sampleProjectData.title)).not.toBeVisible();

    await page.reload();
  
    await expect(pm.onSidebarMenu().getProjectLocator(sampleProjectData.title)).not.toBeVisible();
});

test('Cancel deleting project', async ({page}) => {
    const pm = new PageManager(page);

    await pm.onProjectDetailsPage().clickDeleteProjectButton();
    await pm.onProjectDetailsPage().clickCancelDeletingButton();
    await expect(pm.onSidebarMenu().projectItems).toContainText(sampleProjectData.title);
});