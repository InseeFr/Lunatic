import React from 'react';
import Orchestrator from '../utils/orchestrator';
import sourceBloc from './source-loop-loop.json';
import defaultArgTypes from '../utils/default-arg-types';
import { generateData } from '../../../tests/helpers';
import { playwrightToUserEvent } from '../../../tests/utils/e2e';
import { sleep } from '../../../tests/utils/timer';

const stories = {
	title: 'Components/Loop/LoopOfLoop',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;

export const Default = Template.bind({});
Default.args = {
	id: 'loop-of-loop',
	source: sourceBloc,
	data: generateData({
		PRENOM: ['John', 'Jane'],
		AGE: [29, 32],
		PRENOM_CHILDREN: [
			['John Junior 1', 'John Junior 2'],
			['Jane Junior 1', 'Jane Junior 2'],
		],
		AGE_CHILDREN: [
			[13, 10],
			[9, 8],
		],
	}),
};

export const Filled = Template.bind({});
Filled.args = {
	id: 'loop-of-loop-filled',
	source: sourceBloc,
};

Filled.play = async ({ args, canvasElement }) => {
	const page = playwrightToUserEvent(canvasElement);
	await sleep(100);
	await page.getByRole('button', { name: 'Ajouter un individu' }).click();
	await page.getByLabel('Prénom', { index: 0 }).fill('John');
	await page.getByLabel('Prénom', { index: 1 }).fill('Jane');
	await page.getByRole('button', { name: 'Next' }).click();
	// John informations
	await page.getByLabel('John, quel est vôtre âge ?').fill('20');
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Ajouter un enfant à John' }).click();
	await page
		.getByLabel("Prénom de l'enfant", { index: 0 })
		.fill('John Junior 1');
	await page
		.getByLabel("Prénom de l'enfant", { index: 1 })
		.fill('John Junior 2');
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByLabel("Age de l'enfant John Junior 1 de John").fill('10');
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByLabel("Age de l'enfant John Junior 2 de John").fill('12');
	await page.getByRole('button', { name: 'Next' }).click();
	// Jane informations
	await page.getByLabel('Jane, quel est vôtre âge ?').fill('20');
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Ajouter un enfant à Jane' }).click();
	await page
		.getByLabel("Prénom de l'enfant", { index: 0 })
		.fill('Jane Junior 1');
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByLabel("Age de l'enfant Jane Junior 1 de Jane").fill('9');
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByText('END').shouldBeVisible();
};
