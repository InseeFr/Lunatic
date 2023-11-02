import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';
import ComboBox from './combo-box';
import type { ComboBoxOptionType } from './combo-box.type';

const meta: Meta<typeof ComboBox> = {
	title: 'Components/Commons/ComboBox',
	component: ComboBox,
};

export default meta;

const LabelRenderer = ({
	option,
	placeholder,
}: {
	option?: ComboBoxOptionType;
	placeholder?: string;
}) => <>{option?.label ?? placeholder}</>;

const Template: typeof ComboBox = (args) => {
	console.log({ args });
	const [localValue, setLocalValue] = useState(args.value);
	const [search, setSearch] = useState<string | null>('');
	// Simulate a search
	const options = search
		? args.options.filter((v) =>
				v.value.toLowerCase().includes(search.toLowerCase())
		  )
		: args.options;

	return (
		<fieldset>
			<legend>Select an option : {localValue}</legend>
			<ComboBox
				{...args}
				value={localValue}
				onSelect={(v) => {
					setLocalValue(v);
					args.onSelect?.(v);
				}}
				onChange={(v) => {
					setSearch(v);
					args.onChange?.(v);
				}}
				options={options}
				labelRenderer={LabelRenderer}
				optionRenderer={LabelRenderer}
			/>
			<button onClick={() => setLocalValue('4')}>Sélectionner paris</button>
		</fieldset>
	);
};

export const Default: StoryObj<typeof ComboBox> = {
	render: (args) => <Template {...args} />,
	args: {
		value: '1',
		options: [
			{ id: '1', value: 'Option 1', label: <strong>Option 1</strong> },
			{ id: '2', value: 'Option 2', label: 'Option 2' },
			{ id: '3', value: 'Option 3', label: 'Option 3' },
			{ id: 'paris', value: 'Paris', label: 'Paris' },
			{ id: 'toulouse', value: 'Toulouse', label: 'Toulouse' },
		],
	},
};

export const Editable: StoryObj<typeof ComboBox> = {
	...Default,
	args: {
		...Default.parameters,
		editable: true,
	},
};
