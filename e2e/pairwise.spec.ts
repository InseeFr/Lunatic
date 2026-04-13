import { expect, test } from '@playwright/test';
import {
	expectLunaticData,
	goToStory,
	gotoNextPage,
	gotoPreviousPage,
} from './utils';

test(`can complete pairwise form`, async ({ page }) => {
	await goToStory(page, 'components-pairwiselinks--default');
	await page.getByText('Select a modality').nth(0).click();
	await page.getByText('Sa fille, son fils').click();
	await expect(page.getByText('Sa mère, son père')).toBeVisible();
	await gotoNextPage(page);
	await expectLunaticData(page, 'COLLECTED.LINKS.COLLECTED', [
		[null, '2'],
		['3'],
	]);
});

test(`can complete pairwise form when pairwise is empty`, async ({ page }) => {
	// Given 3 persons in the dynamic table
	await goToStory(page, 'components-pairwiselinks--default');

	await expect(page.getByRole('combobox')).toHaveCount(3);

	await gotoPreviousPage(page, 4);

	// when I clear 'Mom' field (second field of prenom dynamic table)
	await page.getByTitle('Mom').fill('');
	// A return to pairwise page
	await gotoNextPage(page, 4);

	// Expect only one link to collect
	await expect(page.getByRole('combobox')).toHaveCount(1);
	await expect(page.getByText('Qui est Dad pour Unknow ?')).toBeVisible();
	// Expect that no error component is visible
	await expect(page.getByText('must be a dropdown')).not.toBeVisible();
});
