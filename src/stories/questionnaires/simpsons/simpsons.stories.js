import Orchestrator from '../../utils/orchestrator';
import React from 'react';
import defaultArgTypes from '../../utils/default-arg-types';
import { playwrightToUserEvent } from '../../../../tests/utils/e2e';
import simpsons from './source';
import { sleep } from '../../../../tests/utils/timer';

const stories = {
	title: 'Questionnaires/Simpsons',
	component: Orchestrator,
	argTypes: {
		...defaultArgTypes,
		missing: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: true,
		},
		management: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: false,
		},
		shortcut: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: false,
		},
	},
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = {
	id: 'Default',
	source: simpsons,
	pagination: true,
};

export const Filled = Template.bind({});
Filled.args = {
	source: simpsons,
	pagination: true,
};

Filled.play = async ({ args, canvasElement }) => {
	const page = playwrightToUserEvent(canvasElement);
	await sleep(100);
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
		.locator('div')
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
	await sleep(1000);
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
		.getByRole('combobox')
		.click();
	await page.getByText('Jay').click();
	await page
		.getByRole('row', { name: 'Kill Mr Burns' })
		.getByRole('combobox')
		.click();
	await page.getByText('Other').click();
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
		.getByRole('spinbutton')
		.fill('12');
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
		.getByLabel('➡ What is the first name of this character?', { index: 0 })
		.fill('Bart');
	await page
		.getByLabel(
			'➡ How old is this character in the first episode of the Simpsons family?',
			{ index: 0 }
		)
		.fill('14');
	await page
		.getByLabel('➡ What is the first name of this character?', { index: 1 })
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
	await page.getByText('PAGE: 39').shouldBeVisible();
};

export const With_Missing = Template.bind({});

With_Missing.args = {
	id: 'With-missing',
	source: simpsons,
	pagination: true,
	missingStrategy: () => {
		console.log('your strategy has been applied');
	},
	dontKnowButton: 'I dunno',
	refusedButton: 'Oh no!',
	missingShortcut: { dontKnow: 'f2', refused: 'f4' },
	data: { COLLECTED: { READY: { COLLECTED: true } } },
};
