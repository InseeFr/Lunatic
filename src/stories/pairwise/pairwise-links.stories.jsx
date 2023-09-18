import React from 'react';
import Orchestrator from '../utils/orchestrator';
import links from './links';
import data from './data';
import linksComponentSet from './links-componentset.json';
import dataComponentSet from './data-componentset.json';
import defaultArgTypes from '../utils/default-arg-types';
import { playwrightToUserEvent } from '../../../tests/utils/e2e';
import { sleep } from '../../../tests/utils/timer';

const stories = {
	title: 'Components/PairwiseLinks',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});
Default.args = { id: 'links', source: links, pagination: true, data };

export const PairwiseInComponentSet = Template.bind({});
PairwiseInComponentSet.args = {
	id: 'links-componentset',
	source: linksComponentSet,
	pagination: true,
	data: dataComponentSet,
};

export const Filled = Template.bind({});
Filled.args = { ...Default.args, id: 'links-filled' };
Filled.play = async ({ args, canvasElement }) => {
	const page = playwrightToUserEvent(canvasElement);
	await sleep(100);
	await page.getByLabel('Prénom', { index: 2 }).fill('Marc');
	await page.getByRole('button', { name: 'Ajouter un individu' }).click();
	await page.getByLabel('Prénom', { index: 3 }).fill('Jane');
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByLabel('Âge de Jane').click();
	await page.getByLabel('Âge de Jane').fill('20');
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByText('Commencez votre saisie...', { index: 0 }).click();
	await page.getByText('Sa mère, son père').click();
	await page.getByText('Sa fille, son fils').shouldBeVisible();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByText('END').shouldBeVisible();
};
