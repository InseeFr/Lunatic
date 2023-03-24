import React from 'react';
import Orchestrator from '../../utils/orchestrator';
import defaultArgTypes from '../../utils/default-arg-types';
import source from './source.json';
import { generateData } from '../../../../tests/helpers';
import { playwrightToUserEvent } from '../../../../tests/utils/e2e';
import { sleep } from '../../../../tests/utils/timer';

const stories = {
	title: 'Questionnaires/BudgetSepare',
	component: Orchestrator,
	argTypes: {
		...defaultArgTypes,
		missing: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: true,
		},
		activeGoNextForMissing: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: true,
		},
		management: {
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
	id: 'budget-story',
	source,
	data: generateData({
		PRENOM: ['John', 'Jane', 'Marc', 'François'],
		MENAGES: ['Ménage 1', 'Ménage 2'],
		RELATION: ['Ménage 1', 'Ménage 2', 'Ménage 1', 'Ménage 1'],
		MAIN: 'Ménage 1',
		AGES: [30, 31, 32, 33],
	}),
};

export const Filled = Template.bind({});
Filled.args = Default.args;

Filled.play = async ({ args, canvasElement }) => {
	const delay = 1000;
	const page = playwrightToUserEvent(canvasElement);
	await sleep(delay);
	await page.getByRole('button', { name: 'Next' }).click();
	await sleep(delay);
	await page.getByRole('button', { name: 'Next' }).click();
	await sleep(delay);
	await page.getByRole('button', { name: 'Next' }).click();
	await sleep(delay);
	await page.getByRole('button', { name: 'Next' }).click();
	await sleep(delay);
	await page.getByRole('button', { name: 'Next' }).click();
	await sleep(delay);
	await page.getByRole('button', { name: 'Next' }).click();
	await sleep(delay);
	await page.getByRole('button', { name: 'Next' }).click();
	await sleep(delay);
	await page.getByRole('button', { name: 'Next' }).click();
	await sleep(delay);
	await page.getByRole('button', { name: 'Next' }).click();
	await sleep(delay);
	await page.getByRole('button', { name: 'Next' }).click();
};
