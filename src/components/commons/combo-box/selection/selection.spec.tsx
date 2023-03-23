import React from 'react';
import { render } from '@testing-library/react';
import Selection from './selection';
import { describe, expect, it } from 'vitest';
import { ComboBoxOption } from '../combo-box.type';

const options = [
	{ label: 'Apple', value: 'apple' },
	{ label: 'Orange', value: 'orange' },
	{ label: 'Banana', value: 'banana' },
];

describe('Selection component', () => {
	const LabelRenderer = ({ option }: { option: ComboBoxOption }) => (
		<div>{option ? option.label : 'No selection'}</div>
	);

	it('should render correctly with default props', () => {
		const { container } = render(
			<Selection labelRenderer={LabelRenderer} options={options} />
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render correctly when it is editable', () => {
		const { container } = render(
			<Selection
				labelRenderer={LabelRenderer}
				options={options}
				editable={true}
			/>
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render correctly when it is expanded', () => {
		const { container } = render(
			<Selection
				labelRenderer={LabelRenderer}
				options={options}
				expanded={true}
			/>
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render correctly when it is disabled', () => {
		const { container } = render(
			<Selection
				labelRenderer={({ option }) => (
					<div>{option ? option.label : 'No selection'}</div>
				)}
				options={options}
				disabled={true}
			/>
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render the selected option when there is a selection', () => {
		const { getByText } = render(
			<Selection
				labelRenderer={({ option }) => (
					<div>{option ? option.label : 'No selection'}</div>
				)}
				options={options}
				selectedIndex={0}
			/>
		);

		expect(getByText('Apple')).toBeInTheDocument();
	});

	it('should not render the input when it is not editable', () => {
		const { queryByPlaceholderText } = render(
			<Selection
				labelRenderer={({ option }) => (
					<div>{option ? option.label : 'No selection'}</div>
				)}
				options={options}
				placeholder="Search fruits"
				editable={false}
			/>
		);

		expect(queryByPlaceholderText('Search fruits')).not.toBeInTheDocument();
	});
});
