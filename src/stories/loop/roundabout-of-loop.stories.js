import React from 'react';
import Orchestrator from '../utils/orchestrator';
import sourceBloc from './source-roundabout-loop.json';
import defaultArgTypes from '../utils/default-arg-types';
import { generateData } from '../../../tests/helpers';
import { playwrightToUserEvent } from '../../../tests/utils/e2e';
import { sleep } from '../../../tests/utils/timer';

const stories = {
	title: 'Components/Loop/RoundaboutOfLoop',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;

export const Default = Template.bind({});
Default.args = {
	id: 'roundabout-of-loop',
	source: sourceBloc,
	data: generateData({
		PRENOM: ['John', 'Jane'],
		AGE: [29, 32],
	}),
};

export const Filled = Template.bind({});
Filled.args = {
	id: 'loop-of-loop-filled',
	source: sourceBloc,
	data: generateData({
		PRENOM: ['John', 'Jane'],
		AGE: [29, 32],
	}),
};

Filled.play = async ({ args, canvasElement }) => {
	const page = playwrightToUserEvent(canvasElement);
	await sleep(100);
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Commencer', index: 0 }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByLabel("Prénom de l'enfant").fill('John Junior 1');
	await page.getByRole('button', { name: 'Ajouter un enfant à John' }).click();
	await page
		.getByLabel("Prénom de l'enfant", { index: 1 })
		.fill('John Junior 2');
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByLabel("Age de l'enfant John Junior 1 de John").fill('13');
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByLabel("Age de l'enfant John Junior 2 de John").fill('13');
	await page.getByRole('button', { name: 'Next' }).click();
	await page
		.getByRole('button', { name: 'Commencer', index: 0 })
		.shouldBeVisible();
};
