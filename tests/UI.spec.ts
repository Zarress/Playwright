import { test, expect } from '@playwright/test';
import { NoProjectSelected } from '../page-objects/noProjectSelected';
import { SidebarMenu } from '../page-objects/sidebarMenu';

test.beforeEach(async ({ page }) => {
    await page.goto('https://zarress.github.io/Project-Manager-App/');
});

test('Page has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Project Manager/);
});

test.describe('No Project Selected UI', () => {
    test('Has correct elements', async ({ page }) => {
        const onNoProjectSelectedPage = new NoProjectSelected(page);
    
        await expect(onNoProjectSelectedPage.header).toBeVisible();
        await expect(onNoProjectSelectedPage.description).toHaveText('Select a project or get started with new one');
    });
});

test.describe('Sidebar collapsing', () => {
    test('Collapse menu', async ({ page }) => {
        const onSidebarMenu = new SidebarMenu(page);
        await onSidebarMenu.collapseButtonClick();
        await expect(onSidebarMenu.sidebarMenu).not.toBeVisible();
    });

    test('Expand collapsed menu', async ({ page }) => {
        const onSidebarMenu = new SidebarMenu(page);
        await onSidebarMenu.collapseButtonClick();
        await expect(onSidebarMenu.sidebarMenu).not.toBeVisible();
        await onSidebarMenu.collapseButtonClick();
        await expect(onSidebarMenu.sidebarMenu).toBeVisible();
    });
});