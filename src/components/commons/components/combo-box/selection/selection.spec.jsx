import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Selection from './selection';
import { expect, describe, it, vi } from 'vitest';
const options = [
	{ label: 'Apple', value: 'apple' },
	{ label: 'Orange', value: 'orange' },
	{ label: 'Banana', value: 'banana' },
];

describe('Selection component', () => {
	it('should render correctly with default props', () => {
		const { container } = render(
			<Selection
				labelRenderer={({ option }) => (
					<div>{option ? option.label : 'No selection'}</div>
				)}
				options={options}
			/>
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render correctly when it is editable', () => {
		const { container } = render(
			<Selection
				labelRenderer={({ option }) => (
					<div>{option ? option.label : 'No selection'}</div>
				)}
				options={options}
				editable
			/>
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render correctly when it is expended', () => {
		const { container } = render(
			<Selection
				labelRenderer={({ option }) => (
					<div>{option ? option.label : 'No selection'}</div>
				)}
				options={options}
				expended={true}
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
