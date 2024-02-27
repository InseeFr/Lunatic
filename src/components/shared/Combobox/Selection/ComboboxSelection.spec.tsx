import { render } from '@testing-library/react';
import { ComboboxSelection } from './ComboboxSelection';
import { describe, expect, it } from 'vitest';

const options = [
	{ label: 'Apple', value: 'apple' },
	{ label: 'Orange', value: 'orange' },
	{ label: 'Banana', value: 'banana' },
];

describe('Selection component', () => {
	it('should render correctly with default props', () => {
		const { container } = render(<ComboboxSelection options={options} />);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render correctly when it is editable', () => {
		const { container } = render(
			<ComboboxSelection options={options} editable={true} />
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render correctly when it is expanded', () => {
		const { container } = render(
			<ComboboxSelection options={options} expanded={true} />
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render correctly when it is disabled', () => {
		const { container } = render(
			<ComboboxSelection
				options={options}
				disabled={true}
				placeholder="hello!"
			/>
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render the selected option when there is a selection', () => {
		const { getByText } = render(
			<ComboboxSelection options={options} selectedIndex={0} expanded={false} />
		);

		expect(getByText('apple - Apple')).toBeInTheDocument();
	});

	it('should not render the input when it is not editable', () => {
		const { queryByPlaceholderText } = render(
			<ComboboxSelection
				options={options}
				placeholder="Search fruits"
				editable={false}
			/>
		);

		expect(queryByPlaceholderText('Search fruits')).not.toBeInTheDocument();
	});
});
