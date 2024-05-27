import { test, expect } from '@playwright/test';
import { expectPageToHaveText, goToStory } from './utils';

test.describe('Accordion', () => {
	test(`Show the correct body`, async ({ page }) => {
		await goToStory(page, 'components-accordion--default');
		const input = page.getByRole('textbox', { name: 'Nom' });
		await expect(input).toBeVisible();
		await expectPageToHaveText(page, 'Pour en connaître plus sur Inconnu');
		await input.fill('John');
		await expectPageToHaveText(page, 'Pour en connaître plus sur John');
	});
});
