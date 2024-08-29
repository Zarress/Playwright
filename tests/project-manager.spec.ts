import { test, expect } from '@playwright/test';

const sampleProjectData = {
  title: 'title test',
  description: 'description test',
  date: '2024-10-01'
};

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Project Manager/);

  await expect(page.getByRole('heading', { name: 'No Project Selected' })).toBeVisible();
});

test('create new project button', async ({ page }) => {
  await page.getByRole('button', { name: 'Create new project' }).click();

  await expect(page.getByRole('heading', { name: 'Creating a New Project' })).toBeVisible();
});

test('create new project (with data check)', async ({ page }) => {
  await page.getByRole('button', { name: 'Create new project' }).click();

  await page.getByLabel('Title').fill(sampleProjectData.title);

  await page.getByLabel('Description').fill(sampleProjectData.description);

  await page.getByLabel('Due date').fill(sampleProjectData.date);
  
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.locator('aside ul li')).toContainText(sampleProjectData.title);

  await page.reload();
  await expect(page.locator('aside ul li')).toContainText(sampleProjectData.title);

  await page.getByText(sampleProjectData.title).click();

  await expect(page.getByRole('heading', { name: sampleProjectData.title})).toContainText(sampleProjectData.title);

  await expect(page.getByText(sampleProjectData.description)).toContainText(sampleProjectData.description);

  const formattedDate = new Date (sampleProjectData.date).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  await expect(page.getByText(formattedDate)).toContainText(formattedDate);
});

test('cancel creating new project', async ({ page }) => {
  await page.getByRole('button', { name: 'Create new project' }).click();

  await page.getByRole('button', { name: 'Cancel' }).click();

  await expect(page.getByRole('heading', { name: 'No Project Selected' })).toBeVisible();
});

test('delete created project', async ({ page }) => {
  await page.getByRole('button', { name: 'Create new project' }).click();

  await page.getByLabel('Title').fill(sampleProjectData.title);

  await page.getByLabel('Description').fill(sampleProjectData.description);

  await page.getByLabel('Due date').fill(sampleProjectData.date);
  
  await page.getByRole('button', { name: 'Save' }).click();

  await page.getByText(sampleProjectData.title).click();

  await page.getByRole('button', { name: 'Delete project' }).click();

  await page.getByRole('button', { name: 'Yes' }).click();

  await expect(page.locator('aside ul li')).not.toBeVisible();

  await page.reload();

  await expect(page.locator('aside ul li')).not.toBeVisible();
});

test('cancel deleting created project', async ({ page }) => {
  await page.getByRole('button', { name: 'Create new project' }).click();

  await page.getByLabel('Title').fill(sampleProjectData.title);

  await page.getByLabel('Description').fill(sampleProjectData.description);

  await page.getByLabel('Due date').fill(sampleProjectData.date);
  
  await page.getByRole('button', { name: 'Save' }).click();

  await page.getByText(sampleProjectData.title).click();

  await page.getByRole('button', { name: 'Delete project' }).click();

  await page.getByRole('button', { name: 'No' }).click();

  await expect(page.locator('aside ul li')).toContainText(sampleProjectData.title);

  await page.reload();
  await expect(page.locator('aside ul li')).toContainText(sampleProjectData.title);
});

test('add task to created project', async ({ page }) => {
  await page.getByRole('button', { name: 'Create new project' }).click();

  await page.getByLabel('Title').fill(sampleProjectData.title);

  await page.getByLabel('Description').fill(sampleProjectData.description);

  await page.getByLabel('Due date').fill(sampleProjectData.date);
  
  await page.getByRole('button', { name: 'Save' }).click();

  await page.getByText(sampleProjectData.title).click();

  const sampleTaskName = 'test task';

  await page.getByPlaceholder('Enter task name ...').fill(sampleTaskName);

  await page.getByRole('button', { name: '+ Add Task' }).click();

  await expect(page.getByText('No tasks added yet')).not.toBeVisible();
  await expect(page.locator('section ul li p').first()).toContainText("1");
  await expect(page.locator('section ul li p').nth(1)).toContainText(sampleTaskName);

  await page.reload();

  await page.getByText(sampleProjectData.title).click();

  await expect(page.getByText('No tasks added yet')).not.toBeVisible();
  await expect(page.locator('section ul li p').first()).toContainText("1");
  await expect(page.locator('section ul li p').nth(1)).toContainText(sampleTaskName);
});

test('cannot add task with empty name', async ({ page }) => {
  await page.getByRole('button', { name: 'Create new project' }).click();

  await page.getByLabel('Title').fill(sampleProjectData.title);

  await page.getByLabel('Description').fill(sampleProjectData.description);

  await page.getByLabel('Due date').fill(sampleProjectData.date);
  
  await page.getByRole('button', { name: 'Save' }).click();

  await page.getByText(sampleProjectData.title).click();

  await page.getByRole('button', { name: '+ Add Task' }).click();

  await expect(page.locator('section ul li')).not.toBeVisible();
  await expect(page.getByText('No tasks added yet')).toBeVisible();
});

test('clear created task', async ({ page }) => {
  await page.getByRole('button', { name: 'Create new project' }).click();

  await page.getByLabel('Title').fill(sampleProjectData.title);

  await page.getByLabel('Description').fill(sampleProjectData.description);

  await page.getByLabel('Due date').fill(sampleProjectData.date);
  
  await page.getByRole('button', { name: 'Save' }).click();

  await page.getByText(sampleProjectData.title).click();

  const sampleTaskName = 'test task';
  
  await page.getByPlaceholder('Enter task name ...').fill(sampleTaskName);

  await page.getByRole('button', { name: '+ Add Task' }).click();

  await page.locator('section ul li button').click();

  await expect(page.locator('section ul li')).not.toBeVisible();
  await expect(page.getByText('No tasks added yet')).toBeVisible();
});

test('collapse menu', async ({ page }) => {
  await page.locator('aside > button').click();
  await expect(page.locator('aside > div')).not.toBeVisible();
});

test('expand collapsed menu', async ({ page }) => {
  await page.locator('aside > button').click();

  await expect(page.locator('aside > div')).not.toBeVisible();

  await page.locator('aside > button').click();

  await expect(page.locator('aside > div')).toBeVisible();
});