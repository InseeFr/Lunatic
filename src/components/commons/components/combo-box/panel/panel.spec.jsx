import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Panel from './panel';
import { describe, it, expect, vi } from 'vitest';

describe('Panel', () => {
	const options = [
		{ id: '1', value: 'Option 1' },
		{ id: '2', value: 'Option 2' },
		{ id: '3', value: 'Option 3' },
	];

	const optionRenderer = ({ option }) => <div>{option.value}</div>;

	it('renders null when expended is false', () => {
		render(<Panel expended={false} />);
		expect(screen.queryByRole('option')).not.toBeInTheDocument();
	});

	it('renders the options when expended is true', () => {
		render(
			<Panel
				optionRenderer={optionRenderer}
				options={options}
				focused={false}
				selectedIndex={null}
				expended={true}
				id="test"
				search=""
				onSelect={() => {}}
			/>
		);

		expect(screen.getByRole('listbox')).toBeInTheDocument();

		options.forEach((option) => {
			expect(screen.getByText(option.value)).toBeInTheDocument();
		});
	});

	// it('renders the selected option with the "selected" class', () => {
	// 	render(
	// 		<Panel
	// 			optionRenderer={optionRenderer}
	// 			options={options}
	// 			focused={false}
	// 			selectedIndex={1}
	// 			expended={true}
	// 			id="test"
	// 			search=""
	// 			onSelect={() => {}}
	// 		/>
	// 	);

	// 	expect(screen.getByRole('listbox')).toBeInTheDocument();

	// 	options.forEach((option, index) => {
	// 		const optionElement = screen.getByText(option.value);
	// 		if (index === 1) {
	// 			expect(optionElement).toHaveClass('selected');
	// 		} else {
	// 			expect(optionElement).not.toHaveClass('selected');
	// 		}
	// 	});
	// });

	it('calls onSelect when an option is clicked', () => {
		const handleSelect = vi.fn();

		render(
			<Panel
				optionRenderer={optionRenderer}
				options={options}
				focused={false}
				selectedIndex={null}
				expended={true}
				id="test"
				search=""
				onSelect={handleSelect}
			/>
		);

		expect(screen.getByRole('listbox')).toBeInTheDocument();

		const option = screen.getByText('Option 2');
		userEvent.click(option);

		expect(handleSelect).toHaveBeenCalledWith(1);
	});
});
