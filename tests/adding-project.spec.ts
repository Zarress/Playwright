import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { simpleProjectData } from '../test-data/projectTestData';
import { getFormattedDate } from '../helpers/dateHelper';

test.beforeEach(async ({ page }) => {
    await page.goto('https://zarress.github.io/Project-Manager-App/');

    const pm = new PageManager(page);
    await pm.onNoProjectSelectedPage.clickCreateNewProjectButton();
});

test('Add project and check data stored', async ({ page }) => {
    const pm = new PageManager(page);
    
    await pm.onCreateNewProjectPage.createNewProject(simpleProjectData.title, simpleProjectData.description, simpleProjectData.dueDate);

    await expect(pm.onSidebarMenu.projectItems).toContainText(simpleProjectData.title);

    await page.reload();
    await expect(pm.onSidebarMenu.projectItems).toContainText(simpleProjectData.title);

    await pm.onSidebarMenu.navigateToProjectDetails(simpleProjectData.title);

    await expect(pm.onProjectDetailsPage.projectTitle).toContainText(simpleProjectData.title);

    await expect(pm.onProjectDetailsPage.projectDescription).toHaveText(simpleProjectData.description);

    const formattedDate = getFormattedDate(simpleProjectData.dueDate);
    await expect(pm.onProjectDetailsPage.projectDueDate).toContainText(formattedDate);
});

test('Cancel creating new project', async ({ page }) => {
    const pm = new PageManager(page);

    await pm.onCreateNewProjectPage.cancelCreatingNewProject();

    await expect(pm.onNoProjectSelectedPage.header).toBeVisible();
});

test.describe('Navigation', () => {
    test('From "No Selected Project" page', async ({ page }) => {
        await page.reload();

        const pm = new PageManager(page);
    
        await pm.onNoProjectSelectedPage.clickCreateNewProjectButton();
    
        await expect(pm.onCreateNewProjectPage.createNewProjectHeader).toBeVisible();
    });

    test('From sidebar menu', async ({ page }) => {
        const pm = new PageManager(page);
    
        await pm.onSidebarMenu.navigateToAddNewProject();
    
        await expect(pm.onCreateNewProjectPage.createNewProjectHeader).toBeVisible();
    });
})
