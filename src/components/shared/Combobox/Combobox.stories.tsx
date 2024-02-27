import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Combobox } from './Combobox';
import type { ComboboxOptionType } from './ComboboxType';

const meta: Meta<typeof Combobox> = {
	title: 'Components/Shared/ComboBox',
	component: Combobox,
};

export default meta;

const LabelRenderer = ({
	option,
	placeholder,
}: {
	option?: ComboboxOptionType;
	placeholder?: string;
}) => <>{option?.label ?? placeholder}</>;

const Template: typeof Combobox = (args) => {
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
			<Combobox
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

export const Default: StoryObj<typeof Combobox> = {
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

export const Editable: StoryObj<typeof Combobox> = {
	...Default,
	args: {
		...Default.parameters,
		editable: true,
	},
};
