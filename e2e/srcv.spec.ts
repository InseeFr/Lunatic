import { expect, test } from '@playwright/test';
import { gotoNextPage, goToStory } from './utils';

test('Roundabout control on SRCV questionnaire', async ({ page }) => {
	await goToStory(page, 'questionnaires-srcv--default');
	await gotoNextPage(page);
	// We should see 2 row level control (modal and red label under roundabout)
	await expect(
		page.getByText('Le QI doit être renseigné pour pouvoir continuer.')
	).toHaveCount(2);
});
