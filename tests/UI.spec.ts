import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

test.beforeEach(async ({ page }) => {
    await page.goto('https://zarress.github.io/Project-Manager-App/');
});

test('Page has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Project Manager/);
});

test.describe('No Project Selected UI', () => {
    test('Has correct elements', async ({ page }) => {
        const pm = new PageManager(page);
        await expect(pm.onNoProjectSelectedPage.header).toBeVisible();
        await expect(pm.onNoProjectSelectedPage.description).toHaveText('Select a project or get started with new one');
    });
});

test.describe('Sidebar collapsing', () => {
    test('Collapse menu', async ({ page }) => {
        const pm = new PageManager(page);
        await pm.onSidebarMenu.collapseButtonClick();
        await expect(pm.onSidebarMenu.sidebarMenu).not.toBeVisible();
    });

    test('Expand collapsed menu', async ({ page }) => {
        const pm = new PageManager(page);
        await pm.onSidebarMenu.collapseButtonClick();
        await expect(pm.onSidebarMenu.sidebarMenu).not.toBeVisible();
        await pm.onSidebarMenu.collapseButtonClick();
        await expect(pm.onSidebarMenu.sidebarMenu).toBeVisible();
    });
});