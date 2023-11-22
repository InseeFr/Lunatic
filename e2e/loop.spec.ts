import { test, expect } from '@playwright/test';
import { expectLunaticData, goToStory } from './utils';

const loopTypes = ['blockforloop', 'rosterforloop'];
loopTypes.forEach((loopType) => {
	test(`can complete a simple ${loopType}`, async ({ page }) => {
		await goToStory(page, `components-loop-${loopType}--default`);
		await page.locator('#prenom-0').fill('John');
		await page.getByRole('button', { name: 'Ajouter un individu' }).click();
		await page.locator('#prenom-1').fill('Jane');
		await page.getByRole('button', { name: 'Next' }).click();
		await page.getByLabel('John, quel est vôtre âge ?').fill('18');
		await page.getByRole('button', { name: 'Next' }).click();
		await page.getByLabel('Jane, quel est vôtre âge ?').fill('20');
		await page.getByRole('button', { name: 'Next' }).click();
		await expect(page.getByText('PageTag: "3"')).toBeVisible();
		await expectLunaticData(page, 'COLLECTED.PRENOM.COLLECTED', [
			'John',
			'Jane',
		]);
	});
});
