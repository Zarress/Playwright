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
});

test('Add project and check data stored', async ({ page }) => {
    const pm = new PageManager(page);
    
    await pm.onCreateNewProjectPage().createNewProject(sampleProjectData.title, sampleProjectData.description, sampleProjectData.dueDate);

    await expect(pm.onSidebarMenu().projectItems).toContainText(sampleProjectData.title);

    await page.reload();
    await expect(pm.onSidebarMenu().projectItems).toContainText(sampleProjectData.title);

    await pm.onSidebarMenu().navigateToProjectDetails(sampleProjectData.title);

    await expect(pm.onProjectDetailsPage().projectTitle).toContainText(sampleProjectData.title);

    await expect(pm.onProjectDetailsPage().projectDescription).toHaveText(sampleProjectData.description);

    const formattedDate = await pm.onProjectDetailsPage().getFormattedDate(sampleProjectData.dueDate);
    await expect(pm.onProjectDetailsPage().projectDueDate).toContainText(formattedDate);
});

test('Cancel creating new project', async ({ page }) => {
    const pm = new PageManager(page);

    await pm.onCreateNewProjectPage().cancelCreatingNewProject();

    await expect(pm.onNoProjectSelectedPage().header).toBeVisible();
});

test.describe('Navigation', () => {
    test('From "No Selected Project" page', async ({ page }) => {
        await page.reload();

        const pm = new PageManager(page);
    
        await pm.onNoProjectSelectedPage().clickCreateNewProjectButton();
    
        await expect(pm.onCreateNewProjectPage().createNewProjectHeader).toBeVisible();
    });

    test('From sidebar menu', async ({ page }) => {
        const pm = new PageManager(page);
    
        await pm.onSidebarMenu().navigateToAddNewProject();
    
        await expect(pm.onCreateNewProjectPage().createNewProjectHeader).toBeVisible();
    });
})
