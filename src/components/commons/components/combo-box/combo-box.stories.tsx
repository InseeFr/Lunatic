import ComboBox from './combo-box';
import { Meta, Story } from '@storybook/react';
import { ComboBoxOptionType } from './combo-box.type';
import { ComponentProps } from 'react';

const stories = {
	title: 'Components/Commons/ComboBox',
	component: ComboBox,
} as Meta;

export default stories;

const LabelRenderer = ({
	option,
	placeholder,
}: {
	option?: ComboBoxOptionType;
	placeholder?: string;
}) => <>{option?.label ?? placeholder}</>;

const Template: Story<ComponentProps<typeof ComboBox>> = (args) => (
	<ComboBox
		{...args}
		labelRenderer={LabelRenderer}
		optionRenderer={LabelRenderer}
	/>
);

export const Default = Template.bind({});
Default.args = {
	value: '1',
	options: [
		{ id: '1', value: 'Option 1', label: <strong>Option 1</strong> },
		{ id: '2', value: 'Option 2', label: 'Option 2' },
		{ id: '3', value: 'Option 3', label: 'Option 3' },
	],
};
