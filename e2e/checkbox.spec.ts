import { expect, test } from '@playwright/test';
import { expectChanges, expectCollectedData, goToStory } from './utils';

test.describe('Checkboxes', () => {
	test.describe('CheckboxGroup', () => {
		test(`Keyboard shortcut should check boxes`, async ({ page }) => {
			await goToStory(page, 'components-checkboxgroup--default');
			await expect(
				page.getByRole('checkbox', { name: 'Janvier' })
			).toBeVisible();
			await page.keyboard.type('ab');
			await expect(
				page.getByRole('checkbox', { name: 'Janvier' })
			).toHaveAttribute('aria-checked', 'true');
			await expect(
				page.getByRole('checkbox', { name: 'Février' })
			).toHaveAttribute('aria-checked', 'true');
			await expect(
				page.getByRole('checkbox', { name: 'Mars' })
			).not.toHaveAttribute('aria-checked', 'true');
			await expectCollectedData(page, 'MOIS1', true);
			await expectCollectedData(page, 'MOIS2', true);
			await expectCollectedData(page, 'MOIS3', null);
		});

		test(`Keyboard shortcut should be disabled in readonly`, async ({
			page,
		}) => {
			await goToStory(page, 'components-checkboxgroup--read-only');
			await expect(
				page.getByRole('checkbox', { name: 'Janvier' })
			).toBeVisible();
			await page.keyboard.type('ab');
			await expect(
				page.getByRole('checkbox', { name: 'Janvier' })
			).not.toHaveAttribute('aria-checked', 'true');
			await expectCollectedData(page, 'MOIS2', null);
		});

		test('Can select arbitrary value', async ({ page }) => {
			await goToStory(page, 'components-checkboxgroup--arbitrary');
			const selector = page.getByRole('checkbox', { name: 'Autre préciser' });
			await expect(selector).toBeVisible();
			await selector.click();
			await expect(selector).toHaveAttribute('aria-checked', 'true');
			await page
				.getByRole('textbox', { name: 'Préciser' })
				.fill('Demonstration');
			await expectCollectedData(page, 'NATIO1N_OTHER', true);
			await expectCollectedData(page, 'NATIO1N_DETAIL', 'Demonstration');
		});
	});

	test.describe('CheckboxOne', () => {
		test(`Allow detail selection`, async ({ page }) => {
			await goToStory(page, 'components-checkboxone--with-detail');
			await expect(page.getByRole('radio', { name: 'Autre' })).toBeVisible();
			await page.getByRole('radio', { name: 'Autre' }).click();
			await page.getByRole('textbox', { name: 'Préciser' }).fill('Bonjour');
			await expectCollectedData(page, 'Q2', '3');
			await expectCollectedData(page, 'Q3', 'Bonjour');
		});
		test(`Clicking multiple time should not trigger onChange`, async ({
			page,
		}) => {
			await goToStory(page, 'components-checkboxone--default');
			await expect(page.getByRole('radio', { name: 'oui' })).toBeVisible();
			await page.getByRole('radio', { name: 'oui' }).click();
			await expectChanges(page, 0, () => {
				return page.getByRole('radio', { name: 'oui' }).click();
			});
		});
	});

	test.describe('Radio', () => {
		test(`Allow check a value`, async ({ page }) => {
			await goToStory(page, 'components-radio--default');
			await expect(page.getByRole('radio', { name: 'oui' })).toBeVisible();
			await page.getByRole('radio', { name: 'oui' }).click();
			await expectCollectedData(page, 'Q2', '1');
		});
		test(`Clicking multiple time should not trigger onChange`, async ({
			page,
		}) => {
			await goToStory(page, 'components-radio--default');
			await expect(page.getByRole('radio', { name: 'oui' })).toBeVisible();
			await page.getByRole('radio', { name: 'oui' }).click();
			await expectChanges(page, 0, () => {
				return page.getByRole('radio', { name: 'oui' }).click();
			});
		});
	});
});
