import { expect, test } from '@playwright/test';
import { expectLunaticData, goToStory, gotoNextPage } from './utils';

test(`can complete pairwise form`, async ({ page }) => {
	await goToStory(page, 'components-pairwiselinks--default');
	await page.getByLabel('Prénom').nth(2).fill('Marc');
	await page.getByRole('button', { name: 'Add row' }).click();
	await page.getByLabel('Prénom').nth(3).fill('Jane');
	await gotoNextPage(page, 4);
	await page.getByLabel('Âge de Jane').click();
	await page.getByLabel('Âge de Jane').fill('20');
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByText('Commencez votre saisie...').nth(0).click();
	await page.getByText('Sa fille, son fils').click();
	await expect(page.getByText('Sa mère, son père')).toBeVisible();
	await gotoNextPage(page);
	await expectLunaticData(page, 'COLLECTED.LINKS.COLLECTED', [
		[null, '3', null, null],
		['2', null, null, null],
		[null, null, null, null],
		[null, null, null, null],
	]);
});
