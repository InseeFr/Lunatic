import { render } from '@testing-library/react';
import LabelSelection from './label-selection';
import { describe, it, expect } from 'vitest';
import { ComboBoxOption } from '../combo-box.type';

describe('LabelSelection', () => {
	const options = [
		{ label: 'Option 1', value: 'apple' },
		{ label: 'Option 2', value: 'orange' },
		{ label: 'Option 3', value: 'banana' },
	];

	const LabelRenderer = (props: { option: ComboBoxOption }) => {
		return <>{props.option.label ?? 'Unknown'}</>;
	};

	it('should render the labelRenderer when expanded is true and editable is false', () => {
		const { getByText } = render(
			<LabelSelection
				labelRenderer={LabelRenderer}
				selectedIndex={0}
				options={options}
				placeholder="Select an option..."
				search="search term"
				disabled={false}
			/>
		);

		expect(getByText('Option 1')).toBeInTheDocument();
	});

	it('should add the disabled class when disabled is true', () => {
		const { container } = render(
			<LabelSelection
				labelRenderer={LabelRenderer}
				selectedIndex={0}
				options={options}
				placeholder="Select an option..."
				search="search term"
				disabled={true}
			/>
		);

		expect(container.firstChild).toHaveClass('disabled');
	});
});
