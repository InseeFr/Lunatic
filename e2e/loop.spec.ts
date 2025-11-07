import { test, expect } from '@playwright/test';
import { expectLunaticData, goToStory } from './utils';

const loopTypes = ['loop--paginated', 'loop-roster--default'];
loopTypes.forEach((loopType) => {
	test(`can complete a simple ${loopType.split('--')[0]}`, async ({ page }) => {
		await goToStory(page, `components-${loopType}`);
		await page.locator('#prenom-0').fill('John');
		await page.getByRole('button', { name: 'Add row' }).click();
		await page.locator('#prenom-1').fill('Jane');
		await page.getByRole('button', { name: 'Add row' }).click();
		await page.locator('#prenom-2').fill('Janette');
		await page.getByRole('button', { name: 'Next' }).click();
		await page.getByLabel('John, quel est vôtre âge ?').fill('18');
		await page.getByRole('button', { name: 'Next' }).click();
		await page.getByLabel('Jane, quel est vôtre âge ?').fill('20');
		await page.getByRole('button', { name: 'Next' }).click();
		await page.getByLabel('Janette, quel est vôtre âge ?').fill('22');
		await page.getByRole('button', { name: 'Next' }).click();
		await expect(page.getByText('PageTag"3"')).toBeVisible();
		await expectLunaticData(page, 'COLLECTED.PRENOM.COLLECTED', [
			'John',
			'Jane',
			'Janette',
		]);
	});
});

test.describe('Loop row interaction', () => {
	loopTypes.forEach((loopType) => {
		const loopName = loopType.split('--')[0];

		test(`adding row focuses the new row first input - ${loopName}`, async ({
			page,
		}) => {
			await goToStory(page, `components-${loopType}`);
			await page.locator('#prenom-0').fill('John');
			// Add a new row
			await page.getByRole('button', { name: 'Add row' }).click();
			// Expect focus to be on the first input of the new row (index 1)
			const activeTag = await page.evaluate(() => document.activeElement?.id);
			expect(activeTag).toBe('prenom-1');
		});

		test(`removing row focuses the previous row first input - ${loopName}`, async ({
			page,
		}) => {
			await goToStory(page, `components-${loopType}`);
			await page.locator('#prenom-0').fill('John');
			await page.getByRole('button', { name: 'Add row' }).click();
			await page.locator('#prenom-1').fill('Jane');
			await page.getByRole('button', { name: 'Add row' }).click();
			await page.locator('#prenom-2').fill('Janette');
			// Remove the last row (Janette)
			await page.getByRole('button', { name: 'Remove row' }).click();
			// Expect focus to be on the first input of the new last row (index 1, Jane)
			const activeTag = await page.evaluate(() => document.activeElement?.id);
			expect(activeTag).toBe('prenom-1');
		});
	});
});
