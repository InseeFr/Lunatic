import { test, expect } from '@playwright/test';
import { goToStory } from './utils';

test('conditionFilter work on ComponentSet children', async ({ page }) => {
	await goToStory(page, 'components-componentset--default');
	await page.getByLabel('Prénom').click();
	await page.getByLabel('Prénom').fill('Jane');
	await expect(page.getByText('ConditionFilter')).toBeVisible();
	await page.getByLabel('Prénom').fill('');
	await expect(page.getByText('ConditionFilter')).not.toBeVisible();
});
