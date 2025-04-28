import { sleep } from '../../tests/utils/timer';
import { Orchestrator } from '../utils/Orchestrator';
import source from './source-roster.json';

import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';

const meta: Meta<typeof Orchestrator> = {
	title: 'Components/Loop/Roster',
	component: Orchestrator,
};

export default meta;
type Story = StoryObj<typeof Orchestrator>;

export const Default: Story = {
	args: {
		source,
	},
};

export const ReadOnly: Story = {
	args: {
		source,
		readOnly: true,
	},
};

export const Filled: Story = {
	args: Default.args,
	play: async ({ canvasElement }) => {
		await sleep(1000);
		const canvas = within(canvasElement);
		canvas.getByRole('button', { name: 'Ajouter une ligne' }).click();
		await sleep(10);
		const inputs = canvas.getAllByRole('textbox');
		await userEvent.type(inputs[0], 'John', {
			delay: 10,
		});
		await userEvent.type(inputs[3], 'Jane', {
			delay: 10,
		});
		canvas.getByRole('button', { name: 'Next' }).click();
		await userEvent.type(
			await canvas.findByRole('textbox', { name: /John/i }),
			'18'
		);
		canvas.getByRole('button', { name: 'Next' }).click();
		await userEvent.type(
			await canvas.findByRole('textbox', { name: /Jane/i }),
			'20'
		);
		canvas.getByRole('button', { name: 'Next' }).click();
		await canvas.findByText('End');
	},
};
