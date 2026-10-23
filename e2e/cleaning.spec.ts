import { expect, test } from '@playwright/test';
import {
	expectCollectedData,
	gotoNextPage,
	gotoPreviousPage,
	goToStory,
} from './utils';

test.describe('Cleaning', () => {
	test(`Should only clean on page change with "sequence" pagination`, async ({
		page,
	}) => {
		await goToStory(page, 'behaviour-cleaning--sequence');
		const q = page.locator('#mpfped8m');
		const testInput = page.locator('#mv58ouq2');
		const tabInput = page.locator('#mpfp48fx-RDOP-mpfougkl-0');

		// Page 1: answer 30 to Q
		await q.fill('30');
		await gotoNextPage(page);

		// Page 2: fill TEST and the first TAB_ANNEX2 amount
		await testInput.fill('test');
		await tabInput.fill('50');
		await gotoPreviousPage(page);

		// Page 1: change 30 to 31, Q is 3 (filter false) in between
		await q.press('End');
		await q.press('Backspace');
		await q.press('1');
		await expect(q).toHaveValue('31');
		await gotoNextPage(page);

		// Page 2: the data should not have been cleaned
		await expect(testInput).toHaveValue('test');
		await expect(tabInput).toHaveValue('50');

		// Page 1: change Q to 3 (filter false), page 2 is skipped
		await gotoPreviousPage(page);
		await q.fill('3');
		await gotoNextPage(page);

		// The data should be cleaned
		await expectCollectedData(page, 'TEST', null);
		await expectCollectedData(page, 'TAB_ANNEX2', [null]);
	});
});
