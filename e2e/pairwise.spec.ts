import { expect, test } from '@playwright/test';
import { expectLunaticData, goToStory, gotoNextPage } from './utils';

const stories = [
	['pairwise', 'components-pairwiselinks--default'],
	[
		'pairwise in component set',
		'components-pairwiselinks--pairwise-in-component-set',
	],
];

for (const [label, story] of stories) {
	test(`can complete ${label} form`, async ({ page }) => {
		await goToStory(page, story);
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
}
