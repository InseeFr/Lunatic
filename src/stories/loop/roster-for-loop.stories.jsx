import React from 'react';
import Orchestrator from '../utils/orchestrator';
import sourceRoster from './source-roster';
import defaultArgTypes from '../utils/default-arg-types';
import { playwrightToUserEvent } from '../../../tests/utils/e2e';
import { sleep } from '../../../tests/utils/timer';

const stories = {
	title: 'Components/Loop/RosterForLoop',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});
export const ReadOnly = Template.bind({});

Default.args = { id: 'roster-for-loop', source: sourceRoster };
ReadOnly.args = { id: 'roster-for-loop', source: sourceRoster, readOnly: true };

export const Filled = Template.bind({});
Filled.args = { id: 'roster-for-loop', source: sourceRoster };

Filled.play = async ({ args, canvasElement }) => {
	const page = playwrightToUserEvent(canvasElement);
	await sleep(100);
	await page.getByRole('button', { name: 'Ajouter un individu' }).click();
	await page.getByLabel('Prénom', { index: 0 }).fill('John');
	await page.getByLabel('Prénom', { index: 1 }).fill('Jane');
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByLabel('John, quel est vôtre âge ?').fill('18');
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByLabel('Jane, quel est vôtre âge ?').fill('21');
	await page.getByLabel(/Page/).fill('2.1#1');
	await page.getByRole('button', { name: /Go to page/ }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByText('End').shouldBeVisible();
};
