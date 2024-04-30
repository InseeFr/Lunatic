import { test, expect } from '@playwright/test';
import { gotoNextPage, goToStory } from './utils';

test(`Simple controls should work`, async ({ page }) => {
	await goToStory(page, 'behaviour-controls--simple');
	await gotoNextPage(page);
	await gotoNextPage(page);
	await page.getByRole('button', { name: 'Correct' }).click();
	await expect(page.getByText('booleen pas coché')).toBeVisible();
	await gotoNextPage(page);
	await page.getByRole('button', { name: 'Ignore' }).click();
	await page.getByLabel('➡ 2. Controle sur du texte < 255').fill('BLABLA');
	await gotoNextPage(page);
	await page.getByRole('button', { name: 'Correct' }).click();
	await expect(page.getByText('a ne peut pas valoir BLABLA')).toBeVisible();
});

test(`Controls are visible on rows`, async ({ page }) => {
	await goToStory(page, `behaviour-controls--loop`);
	await gotoNextPage(page);
	await page.getByRole('button', { name: 'Correct' }).click();
	await expect(
		page.getByText('Global level : Vous devez entrer 3 personnes min')
	).toBeVisible();
	// We should see 2 row level validation
	expect(await page.getByText('Row level : Age doit être > 18').count()).toBe(
		2
	);
	// We should have error in each cell
	expect(await page.getByText('Age doit être > 18').count()).toBe(4);
});
