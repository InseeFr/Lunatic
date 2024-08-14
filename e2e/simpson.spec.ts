import { expect, test } from '@playwright/test';
import { expectCollectedData, gotoNextPage, goToStory } from './utils';

test('can complete simpson form', async ({ page }) => {
	await goToStory(page, 'questionnaires-simpsons--default');
	await gotoNextPage(page);
	await page
		.getByRole('group', {
			name: 'Before starting, do you have any comments about the Simpsons family?',
		})
		.getByRole('textbox')
		.fill('They are yellow');
	await gotoNextPage(page);
	await page
		.getByRole('group', {
			name: 'If you agree to answer this questionnaire, please check the box',
		})
		.getByRole('checkbox')
		.click();
	await gotoNextPage(page);
	await page
		.getByRole('group', { name: 'Who is the producer?' })
		.getByRole('textbox')
		.fill('Matt Groening');
	await gotoNextPage(page);
	await page
		.getByRole('group', { name: 'What is the current season number?' })
		.getByRole('textbox')
		.fill('20');
	await gotoNextPage(page, 4);
	await page
		.getByRole('group', { name: 'How long does an episode last?' })
		.getByRole('textbox')
		.fill('2');
	await gotoNextPage(page);
	await page
		.getByRole('group', {
			name: 'How long does it take to write a new episode?',
		})
		.getByRole('textbox')
		.fill('10');
	// Page : 10
	await gotoNextPage(page, 8);
	await page.getByRole('radio', { name: 'Springfield' }).click();
	await gotoNextPage(page);
	await page.getByRole('radio', { name: 'Joe Quimby' }).click();
	await gotoNextPage(page);
	await page
		.getByRole('group', {
			name: 'In which state do The Simpsons reside?',
		})
		.getByRole('combobox')
		.click();
	await page.getByText('Not in any state, you fool!').click();
	await gotoNextPage(page, 2);
	await page.getByRole('checkbox', { name: 'Coltrane' }).click();
	await gotoNextPage(page, 3);
	await page
		.getByRole('row', { name: 'Selma Bouvier' })
		.getByRole('radio', { name: 'Springfield' })
		.click();
	await page
		.getByRole('row', { name: 'Kent Brockman' })
		.getByRole('radio', { name: 'Springfield' })
		.click();
	await page
		.getByRole('row', { name: 'Milhouse Van Houten' })
		.getByRole('radio', { name: 'Springfield' })
		.click();
	await page
		.getByRole('row', { name: 'Nelson Muntz' })
		.getByRole('radio', { name: 'Springfield' })
		.click();
	await page
		.getByRole('row', { name: 'Crazy Cat Lady' })
		.getByRole('radio', { name: 'Springfield' })
		.click();
	await gotoNextPage(page, 2);
	for (let i = 0; i < 6; i++) {
		await page.getByRole('textbox').nth(i).fill('10');
	}
	await page.getByRole('textbox').nth(6).fill('40');
	await gotoNextPage(page);
	// page 27
	await page
		.getByRole('row', { name: 'Frozen products Ice creams' })
		.getByRole('radio', { name: 'Yes' })
		.click();
	await page
		.getByRole('row', { name: 'Jasper Beardly' })
		.getByRole('radio', { name: 'Yes' })
		.click();
	await page
		.getByRole('row', { name: 'Meat Bacon' })
		.getByRole('radio', { name: 'No' })
		.click();
	await page
		.getByRole('row', { name: 'Pork chop' })
		.getByRole('radio', { name: 'No' })
		.click();
	await page
		.getByRole('row', { name: 'Total' })
		.getByRole('radio', { name: 'Yes' })
		.click();
	await gotoNextPage(page);
	await page
		.getByRole('row', {
			name: 'Break the windows of the whole city',
		})
		.getByRole('combobox')
		.click();
	await page.getByText('Krusty the clown').click();
	await page
		.getByRole('row', {
			name: 'Loose the violin of his daughter playing poker',
		})
		.getByText('Commencez votre saisie...')
		.click();
	await page.getByText('Jay').click();
	await page
		.getByRole('row', { name: 'Kill Mr Burns' })
		.getByText('Commencez votre saisie...')
		.click();
	await page.getByText('Other').locator('visible=true').click();
	await page.getByText('Commencez votre saisie...').click();
	await page.getByRole('option', { name: 'Jay' }).getByText('Jay').click();
	await gotoNextPage(page, 4);
	await page
		.getByRole('row', { name: 'Jay' })
		.getByRole('radio', { name: 'Up' })
		.click();
	await page
		.getByRole('row', { name: 'Bart' })
		.getByRole('radio', { name: 'Steady' })
		.click();
	await page
		.getByRole('row', { name: 'Krusty the clown' })
		.getByRole('radio', { name: 'Up' })
		.click();
	await page
		.getByRole('row', { name: 'Other' })
		.getByRole('radio', { name: 'Down' })
		.click();
	await gotoNextPage(page);
	await page
		.getByRole('row', { name: 'Leave with pay' })
		.getByText('Commencez votre saisie...')
		.click();
	await page.getByText('Calendar days').click();
	await gotoNextPage(page, 2);
	await page
		.getByRole('group', {
			name: 'How many characters from the Simpsons family could you precisely describe?',
		})
		.getByRole('textbox')
		.click();
	await page
		.getByRole('group', {
			name: 'How many characters from the Simpsons family could you precisely describe?',
		})
		.getByRole('textbox')
		.fill('2');
	await gotoNextPage(page);
	await page
		.getByRole('group', { name: 'What is the first name of this character?' })
		.getByRole('textbox')
		.first()
		.click();
	await page
		.getByRole('group', { name: 'What is the first name of this character?' })
		.getByRole('textbox')
		.first()
		.fill('Bart');
	await page
		.getByRole('group', {
			name: 'How old is this character in the first episode of the Simpsons family?',
		})
		.getByRole('textbox')
		.first()
		.click();
	await page
		.getByRole('group', {
			name: 'How old is this character in the first episode of the Simpsons family?',
		})
		.getByRole('textbox')
		.first()
		.fill('14');
	await page
		.getByRole('group', { name: 'What is the first name of this character?' })
		.getByRole('textbox')
		.nth(1)
		.click();
	await page
		.getByRole('group', { name: 'What is the first name of this character?' })
		.getByRole('textbox')
		.nth(1)
		.fill('Bart');
	await gotoNextPage(page, 2);
	await page.getByRole('radio', { name: 'Yes' }).click();
	await gotoNextPage(page, 3);
	await page.getByRole('radio', { name: 'Yes' }).click();
	await gotoNextPage(page, 3);
	await page
		.getByRole('group', { name: 'Do you have any comment about the survey?' })
		.getByRole('textbox')
		.fill('No');

	// Assertion
	await expect(page.getByText('PageTag: "40"')).toBeVisible();
	await page.getByRole('button', { name: 'Get Data' }).click();
	await expectCollectedData(page, 'COMMENT', 'They are yellow');
});
