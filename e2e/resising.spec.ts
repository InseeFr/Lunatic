import { expect, test } from '@playwright/test';
import { expectLunaticData, gotoNextPage, goToStory } from './utils';

test.describe('"Resising" with Calculating', () => {
	test(`Should handle correctyl calculated value`, async ({ page }) => {
		await goToStory(page, 'behaviour-resizing--calculating');
		await gotoNextPage(page);
		// When adding 3 persons
		await page.locator('#mhm24c6g-0').fill('Aline');
		await page.getByRole('button', { name: 'Add row' }).click();
		await page.locator('#mhm24c6g-1').fill('Renoir');
		await page.getByRole('button', { name: 'Add row' }).click();
		await page.locator('#mhm24c6g-2').fill('Maelle');

		// Then CALCULATED variable should be
		await expect(
			page.getByText('Valeur de T_NBHAB_NVX : 3').first()
		).toBeVisible();
		await expectLunaticData(page, 'CALCULATED.T_NBHAB_NVX', 3);

		// When removing 1 person
		await page.getByRole('button', { name: 'Remove row' }).click();

		// Then CALCULATED variable should decrease
		await expect(
			page.getByText('Valeur de T_NBHAB_NVX : 2').first()
		).toBeVisible();
		await expectLunaticData(page, 'CALCULATED.T_NBHAB_NVX', 2);
	});
});
