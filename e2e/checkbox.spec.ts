import { test, expect } from '@playwright/test';
import { expectCollectedData, goToStory } from './utils';

test.describe('Checkboxes', () => {
	test.describe('CheckboxGroup', () => {
		test(`Keyboard shortcut should check boxes`, async ({ page }) => {
			await goToStory(page, 'components-checkboxgroup--default');
			await expect(
				page.getByRole('checkbox', { name: 'A Janvier' })
			).toBeVisible();
			await page.keyboard.type('ab');
			await expect(
				page.getByRole('checkbox', { name: 'A Janvier' })
			).toHaveAttribute('aria-checked', 'true');
			await expect(
				page.getByRole('checkbox', { name: 'B Février' })
			).toHaveAttribute('aria-checked', 'true');
			await expect(
				page.getByRole('checkbox', { name: 'C Mars' })
			).not.toHaveAttribute('aria-checked', 'true');
			await expectCollectedData(page, 'MOIS1', true);
			await expectCollectedData(page, 'MOIS2', true);
			await expectCollectedData(page, 'MOIS3', null);
		});

		test.only(`Keyboard shortcut should be disabled in readonly`, async ({
			page,
		}) => {
			await goToStory(page, 'components-checkboxgroup--read-only');
			await expect(
				page.getByRole('checkbox', { name: 'A Janvier' })
			).toBeVisible();
			await page.keyboard.type('ab');
			await expect(
				page.getByRole('checkbox', { name: 'A Janvier' })
			).not.toHaveAttribute('aria-checked', 'true');
			await expectCollectedData(page, 'MOIS2', null);
		});
	});
});
