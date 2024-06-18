import { expect, test } from '@playwright/test';
import {
	expectCollectedData,
	expectPageToHaveText,
	gotoNextPage,
	goToStory,
} from './utils';

test.describe('Roundabout', () => {
	test(`can jump to a specific loop`, async ({ page }) => {
		await goToStory(page, 'components-roundabout--default');
		await expectPageToHaveText(page, /Combien/gi);
		await gotoNextPage(page, 2);
		await expect(page.getByRole('button', { name: 'Commencer' })).toHaveCount(
			2
		);
		await page.getByRole('button', { name: 'Commencer' }).nth(1).click();
		await page.getByRole('radio', { name: 'non' }).click();
		await gotoNextPage(page);
		await page.getByRole('radio', { name: 'Homme' }).click();
		await gotoNextPage(page);
		await page.getByLabel('Dites quelque chose.').fill('Bonjour');
		await gotoNextPage(page);
		await expectPageToHaveText(page, 'Complété');
		await gotoNextPage(page);
		await expectPageToHaveText(page, 'Merci');
		await expectCollectedData(page, 'SEXE', [null, '1']);
	});
	test(`navigation jump back to roundabout`, async ({ page }) => {
		await goToStory(page, 'components-roundabout--default');
		await expectPageToHaveText(page, /Combien/gi);
		await gotoNextPage(page, 2);
		for (let n = 0; n < 2; n++) {
			await page.getByRole('button', { name: 'Commencer' }).nth(0).click();
			await page.getByRole('radio', { name: 'non' }).click();
			await gotoNextPage(page);
			await page.getByRole('radio', { name: 'Homme' }).click();
			await gotoNextPage(page);
			await page.getByLabel('Dites quelque chose.').fill('Bonjour');
			await gotoNextPage(page);
			await expectPageToHaveText(page, 'Complété');
		}
		await gotoNextPage(page);
		await expectPageToHaveText(page, 'Merci');
		await expectCollectedData(page, 'SEXE', ['1', '1']);
	});
	test(`disable button when condition is not met`, async ({ page }) => {
		await goToStory(page, 'components-roundabout--default');
		await expectPageToHaveText(page, /Combien/gi);
		await gotoNextPage(page);
		await page.getByRole('textbox', { name: 'Age' }).nth(1).fill('14');
		await gotoNextPage(page);
		await expect(page.getByRole('button', { name: 'Commencer' })).toHaveCount(
			1
		);
	});
	test(`navigation jump roundabout when only one iteration`, async ({
		page,
	}) => {
		await goToStory(page, 'components-roundabout--default');
		await page.getByLabel(/Combien/gi).fill('1');
		await gotoNextPage(page, 2);
		// Roundabout is skipped here
		await page.getByRole('radio', { name: 'non' }).click();
		await gotoNextPage(page);
		await page.getByRole('radio', { name: 'Homme' }).click();
		await gotoNextPage(page);
		await page.getByLabel('Dites quelque chose.').fill('Bonjour');
		await gotoNextPage(page);
		await expectPageToHaveText(page, 'Merci');
		await expectCollectedData(page, 'SEXE', ['1']);
	});
});
