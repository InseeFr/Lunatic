import Orchestrator from '../utils/orchestrator';
import source from './source';
import data from './data';
import defaultArgTypes from '../utils/default-arg-types';
import { playwrightToUserEvent } from '../../../tests/utils/e2e';
import { sleep } from '../../../tests/utils/timer';

const stories = {
	title: 'Components/Roundabout',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = { id: 'roundabout', source, pagination: true, data };

export const Filled = Template.bind({});
Filled.args = Default.args;

Filled.play = async ({ args, canvasElement }) => {
	const page = playwrightToUserEvent(canvasElement);
	await sleep(100);
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Next' }).click();
	await page.getByRole('button', { name: 'Commencer', index: 0 }).click();
	await page.getByRole('button', { name: 'Previous' }).click();
	await page
		.getByRole('button', { name: 'Commencer', index: 0 })
		.shouldBeVisible();
};
