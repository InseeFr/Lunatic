import { test, expect } from '@playwright/test';

test('can complete simpson form', async ({ page }) => {
	await page.goto(
		'http://localhost:9999/iframe.html?viewMode=story&id=questionnaires-simpsons--default'
	);
	await page.getByRole('button', { name: 'Next' }).click();
	await page
		.getByLabel(
			'➡ Before starting, do you have any comments about the Simpsons family?'
		)
		.fill('They are yellow');
	await page.getByRole('button', { name: 'Next' }).click();
	await page
		.getByRole('checkbox', {
			name: '➡ If you agree to answer this questionnaire, please check the box If not, this is unfortunately the end of this questionnaire.',
		})
		.click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByLabel('➡ Who is the producer?').fill('Matt Groening');
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByLabel('➡ What is the current season number?').fill('20');
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByLabel('➡ How long does an episode last?').fill('2');
	await page.getByRole('button', { name: 'Next' }).click();
	await page
		.getByLabel('➡ How long does it take to write a new episode?')
		.fill('10');
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('radio', { name: 'Springfield' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('radio', { name: 'Joe Quimby' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page
		.getByRole('combobox', { name: '➡ In which state do The Simpsons reside?' })
		.click();
	await page.getByText('Not in any state, you fool!').click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('checkbox', { name: 'Santa’s Little Helper' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
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
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
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
	await page.getByRole('button', { name: 'Next' }).click();
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
		.getByText('Please, do something...')
		.click();
	await page.getByText('Jay').click();
	await page
		.getByRole('row', { name: 'Kill Mr Burns' })
		.getByText('Please, do something...')
		.click();
	await page.getByText('Other').click();
	await page.getByText('Please, do something...').click();
	await page.getByRole('option', { name: 'Jay' }).getByText('Jay').click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
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
	await page.getByRole('button', { name: 'Next' }).click();
	await page
		.getByRole('row', { name: 'Leave with pay' })
		.getByText('Please, do something...')
		.click();
	await page.getByText('Calendar days').click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page
		.getByLabel(
			'➡ How many characters from the Simpsons family could you precisely describe?'
		)
		.click();
	await page
		.getByLabel(
			'➡ How many characters from the Simpsons family could you precisely describe?'
		)
		.fill('2');
	await page.getByRole('button', { name: 'Next' }).click();
	await page
		.getByLabel('➡ What is the first name of this character?')
		.first()
		.click();
	await page
		.getByLabel('➡ What is the first name of this character?')
		.first()
		.fill('Bart');
	await page
		.getByLabel(
			'➡ How old is this character in the first episode of the Simpsons family?'
		)
		.first()
		.click();
	await page
		.getByLabel(
			'➡ How old is this character in the first episode of the Simpsons family?'
		)
		.first()
		.fill('14');
	await page
		.getByLabel('➡ What is the first name of this character?')
		.nth(1)
		.click();
	await page
		.getByLabel('➡ What is the first name of this character?')
		.nth(1)
		.fill('Bart');
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('radio', { name: 'Yes' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('radio', { name: 'Yes' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByLabel('➡ Do you have any comment about the survey?').click();
	await page
		.getByLabel('➡ Do you have any comment about the survey?')
		.fill('No');
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();

	// Assertion
	await expect(page.getByText('PAGE: 39')).toBeVisible();
	const consoleOut = page.waitForEvent('console');
	await page.getByRole('button', { name: 'Get State' }).click();
	const output = await consoleOut;
	expect(await output.args()[0].jsonValue()).toHaveProperty(
		'COLLECTED.COMMENT.COLLECTED',
		'They are yellow'
	);
});
