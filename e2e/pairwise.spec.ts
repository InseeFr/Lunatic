import { expect, test } from '@playwright/test';
import { expectLunaticData, goToStory, gotoNextPage } from './utils';

test(`can complete pairwise form`, async ({ page }) => {
	await goToStory(page, 'components-pairwiselinks--default');
	await page.getByText('Commencez votre saisie...').nth(0).click();
	await page.getByText('Sa fille, son fils').click();
	await expect(page.getByText('Sa mère, son père')).toBeVisible();
	await gotoNextPage(page);
	await expectLunaticData(page, 'COLLECTED.LINKS.COLLECTED', [
		[null, '2'],
		['3'],
	]);
});
