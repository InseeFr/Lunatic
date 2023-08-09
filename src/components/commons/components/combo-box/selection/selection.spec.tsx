import { render } from '@testing-library/react';
import { Selection } from './selection';
import { describe, expect, it } from 'vitest';

const options = [
	{ label: 'Apple', value: 'apple' },
	{ label: 'Orange', value: 'orange' },
	{ label: 'Banana', value: 'banana' },
];

describe('Selection component', () => {
	it('should render correctly with default props', () => {
		const { container } = render(<Selection options={options} />);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render correctly when it is editable', () => {
		const { container } = render(
			<Selection options={options} editable={true} />
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render correctly when it is expanded', () => {
		const { container } = render(
			<Selection options={options} expanded={true} />
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render correctly when it is disabled', () => {
		const { container } = render(
			<Selection options={options} disabled={true} placeholder="hello!" />
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render the selected option when there is a selection', () => {
		const { getByText } = render(
			<Selection options={options} selectedIndex={0} expanded={false} />
		);

		expect(getByText('apple - Apple')).toBeInTheDocument();
	});

	it('should not render the input when it is not editable', () => {
		const { queryByPlaceholderText } = render(
			<Selection
				options={options}
				placeholder="Search fruits"
				editable={false}
			/>
		);

		expect(queryByPlaceholderText('Search fruits')).not.toBeInTheDocument();
	});
});
