import { expect, test } from '@playwright/test';
import { expectCollectedData, goToStory } from './utils';

test.describe('RadioGroup', () => {
	test(`Keyboard shortcut should select radio option`, async ({ page }) => {
		await goToStory(page, 'components-radio--default');
		await expect(page.getByText('oui')).toBeVisible();

		// select modality 1
		await page.keyboard.type('1');
		await expect(page.getByRole('radio', { name: 'oui' })).toHaveAttribute(
			'aria-checked',
			'true'
		);
		await expectCollectedData(page, 'Q2', '1');

		// select modality 2
		await page.keyboard.type('2');
		await expect(page.getByRole('radio', { name: 'non' })).toHaveAttribute(
			'aria-checked',
			'true'
		);
		await expectCollectedData(page, 'Q2', '2');
	});

	test(`Keyboard shortcut should be disabled when editing a field (focus on input/textarea)`, async ({
		page,
	}) => {
		await goToStory(page, 'components-radio--with-detail');
		await expect(page.getByText('oui')).toBeVisible();

		// no focus on a field, shorcut is enabled
		await page.keyboard.type('3');
		await expect(page.getByRole('radio', { name: 'Autre' })).toHaveAttribute(
			'aria-checked',
			'true'
		);

		// detail field is autofocus, shortcut is disabled for every option
		await page.keyboard.type('2');
		await expect(page.getByRole('radio', { name: 'non' })).not.toHaveAttribute(
			'aria-checked',
			'true'
		);
		await expect(page.getByRole('radio', { name: 'Autre' })).toHaveAttribute(
			'aria-checked',
			'true'
		);

		await expectCollectedData(page, 'Q2', '3');
		await expectCollectedData(page, 'Q2_DETAIL', '2');
	});
});
