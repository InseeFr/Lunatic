import { test } from '@playwright/test';
import {
	expectCollectedData,
	expectPageToHaveText,
	gotoNextPage,
	gotoPreviousPage,
	goToStory,
} from './utils';

test.describe('Suggester', () => {
	test(`can select a value after a search`, async ({ page }) => {
		await goToStory(page, 'components-suggester--default');
		await expectPageToHaveText(page, 'Variable Commune');
		await page.getByRole('textbox').nth(0).fill('perpi');
		await page.getByText('Perpignan').click();
		await expectCollectedData(page, 'VARIABLECO', '6613600001');
	});

	test(`can see the last selected value after navigation`, async ({ page }) => {
		await goToStory(page, 'components-suggester--default');
		await expectPageToHaveText(page, 'Variable Commune');
		await page.getByRole('textbox').nth(0).fill('perpi');
		await page.getByText('Perpignan').click();
		await gotoNextPage(page);
		await gotoPreviousPage(page);
		await expectCollectedData(page, 'VARIABLECO', '6613600001');
		await expectPageToHaveText(page, 'Perpignan');
	});

	test(`can clear the last selected value`, async ({ page }) => {
		await goToStory(page, 'components-suggester--default');
		await expectPageToHaveText(page, 'Variable Commune');
		await page.getByRole('textbox').nth(0).fill('perpi');
		await page.getByText('Perpignan').click();
		await gotoNextPage(page);
		await gotoPreviousPage(page);
		await expectCollectedData(page, 'VARIABLECO', '6613600001');
		await page.getByLabel('delete').click();
		await expectCollectedData(page, 'VARIABLECO', null);
	});

	test(`can do multiple searches`, async ({ page }) => {
		await goToStory(page, 'components-suggester--default');
		await expectPageToHaveText(page, 'Variable Commune');
		await page.getByRole('textbox').nth(0).fill('Montpell');
		await expectPageToHaveText(page, 'Montpellier');
		await page.getByRole('textbox').nth(0).fill('perpi');
		await expectPageToHaveText(page, 'Perpignan');
	});

	test(`can clear value using a button`, async ({ page }) => {
		await goToStory(page, 'components-suggester--default');
		await expectPageToHaveText(page, 'Variable Commune');
		await page.getByRole('textbox').nth(0).fill('perpi');
		await page.getByText('Perpignan').click();
		await expectCollectedData(page, 'VARIABLECO', '6613600001');
		await page.getByLabel('delete').nth(0).click();
		await expectCollectedData(page, 'VARIABLECO', null);
	});

	test(`can select select a value that set multiple variables`, async ({
		page,
	}) => {
		await goToStory(page, 'components-suggester--option-responses');
		await expectPageToHaveText(page, 'votre produit');
		await page.getByRole('textbox').nth(0).fill('bross');
		await page.getByText('Brosse à cheveux').click();
		await expectCollectedData(page, 'PRODUCT', 'brosse');
		await expectCollectedData(page, 'PRODUCT_NAME', 'Brosse à cheveux');
		await expectCollectedData(page, 'PRODUCT_PRICE', 20);
	});

	test(`show the previous label on blur`, async ({ page }) => {
		await goToStory(page, 'components-suggester--default');
		await expectPageToHaveText(page, 'Variable Commune');
		await page.getByRole('textbox').nth(0).fill('perpi');
		await page.getByText('Perpignan').nth(0).click();
		await page.getByText('Perpignan').click(); // Focus the field again
		await page.getByRole('textbox').nth(0).fill('montpell');
		await expectPageToHaveText(page, 'Montpellier');
		await page.mouse.click(2, 2);
		await expectPageToHaveText(page, 'Perpignan');
	});

	test.describe('arbitrary', () => {
		test('can enter an arbitrary response', async ({ page }) => {
			await goToStory(page, 'components-suggester--arbitrary-response');
			await expectPageToHaveText(page, 'votre produit');
			await page.getByRole('textbox').nth(0).fill('demo');
			await page.getByText('demo').click();
			await expectCollectedData(page, 'PRODUCT_OTHER', 'demo');
			await expectPageToHaveText(page, 'demo');
		});
		test('can see the arbitrary value on navigation', async ({ page }) => {
			await goToStory(page, 'components-suggester--arbitrary-response');
			await expectPageToHaveText(page, 'votre produit');
			await page.getByRole('textbox').nth(0).fill('demo');
			await page.getByText('demo').click();
			await expectCollectedData(page, 'PRODUCT_OTHER', 'demo');
			await expectPageToHaveText(page, 'demo');
			await gotoNextPage(page);
			await gotoPreviousPage(page);
			await expectPageToHaveText(page, 'demo');
		});
		test('can select an option after an arbitrary', async ({ page }) => {
			await goToStory(page, 'components-suggester--arbitrary-response');
			await expectPageToHaveText(page, 'votre produit');
			await page.getByRole('textbox').nth(0).fill('demo');
			await page.getByText('demo').click();
			await expectCollectedData(page, 'PRODUCT_OTHER', 'demo');
			await page.getByText('demo').click();
			await page.getByRole('textbox').nth(0).fill('bross');
			await expectPageToHaveText(page, 'Brosse à cheveux');
		});
	});

	test.describe('a11y', () => {
		test(`can select a value using keyboard`, async ({ page }) => {
			await goToStory(page, 'components-suggester--default');
			await expectPageToHaveText(page, 'Variable Commune');
			await page.getByRole('textbox').nth(0).fill('Montpell');
			await expectPageToHaveText(page, 'Montpellier');
			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('Enter');
			await expectCollectedData(page, 'VARIABLECO', '3417200001');
		});
	});
});
