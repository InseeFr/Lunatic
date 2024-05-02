import { test, expect } from '@playwright/test';
import { expectLunaticData, gotoNextPage, goToStory } from './utils';

test.describe('Missing behaviour', () => {
	test(`Missing keyboard shortcut are supported`, async ({ page }) => {
		await goToStory(page, 'behaviour-missing--default');
		await gotoNextPage(page);
		await page.keyboard.press('F2');
		await expect(
			page.getByRole('button', { name: "Don't know" })
		).toHaveAttribute('aria-pressed', 'true');
		await expectLunaticData(page, 'COLLECTED.NB_MISSING.COLLECTED', 'DK');
	});

	test(`Missing works in loop`, async ({ page }) => {
		await goToStory(page, 'behaviour-missing--default');
		await gotoNextPage(page);
		await page.getByLabel('NB').fill('2');
		await gotoNextPage(page);
		// Fill "don't know" for both "prénoms"
		await page.getByRole('button', { name: "Don't know" }).nth(0).click();
		await page.getByRole('button', { name: "Don't know" }).nth(2).click();
		await expectLunaticData(page, 'COLLECTED.PRENOM_MISSING.COLLECTED', [
			'DK',
			'DK',
		]);
	});
	test(`Keyboard shortcut should trigger all missing`, async ({ page }) => {
		await goToStory(page, 'behaviour-missing--default');
		await gotoNextPage(page);
		await page.getByLabel('NB').fill('2');
		await gotoNextPage(page);
		await page.keyboard.press('F2');
		await expectLunaticData(page, 'COLLECTED.PRENOM_MISSING.COLLECTED', [
			'DK',
			'DK',
		]);
		await expectLunaticData(page, 'COLLECTED.NOM_MISSING.COLLECTED', [
			'DK',
			'DK',
		]);
	});

	test(`Missing keyboard shortcut should be disabled in readonly mode`, async ({
		page,
	}) => {
		await goToStory(page, 'behaviour-missing--read-only');
		await gotoNextPage(page);
		await page.keyboard.press('F2');
		await expect(
			page.getByRole('button', { name: "Don't know" })
		).not.toHaveAttribute('aria-pressed', 'true');
		await expectLunaticData(page, 'COLLECTED.NB_MISSING.COLLECTED', null);
	});
});
