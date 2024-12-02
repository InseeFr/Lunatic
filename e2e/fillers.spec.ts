import { expect, test } from '@playwright/test';
import {
	expectPageToHaveText,
	gotoNextPage,
	gotoPreviousPage,
	goToStory,
} from './utils';

test.describe('Fillers', () => {
	test(`can fill data`, async ({ page }) => {
		await goToStory(page, 'behaviour-fillers--default#t100');

		// First filling
		await page.getByLabel('Code postal').fill('34000');
		await gotoNextPage(page);
		await expectPageToHaveText(page, 'Chargement');
		await expect(page.getByLabel('Ville')).toHaveValue('Montpellier');

		// Second filling
		await gotoPreviousPage(page);
		await page.getByLabel('Code postal').fill('31000');
		await gotoNextPage(page);
		await expect(page.getByLabel('Ville')).toHaveValue('Toulouse');
	});
});
