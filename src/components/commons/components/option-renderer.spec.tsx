import React from 'react';
import { render } from '@testing-library/react';
import OptionRenderer from './option-renderer';
import { describe, it, expect } from 'vitest';

describe('DefaultOptionRenderer', () => {
	it('renders without label', () => {
		const option = { id: '1', value: 'Value' };
		const { getByText, queryByText } = render(
			<OptionRenderer option={option} />
		);
		const idElement = getByText(option.id);
		const labelElement = queryByText('-');
		expect(idElement).toBeInTheDocument();
		expect(labelElement).toBeNull();
	});

	it('renders with label', () => {
		const option = { id: '1', value: 'Value', label: 'Label' };
		const { getByText } = render(<OptionRenderer option={option} />);
		const idElement = getByText(option.id);
		const labelElement = getByText(option.label);
		expect(idElement).toBeInTheDocument();
		expect(labelElement).toBeInTheDocument();
	});

	it('renders with selected class', () => {
		const option = { id: '1', value: 'Value', label: 'Label' };
		const { container } = render(<OptionRenderer option={option} selected />);
		expect(container.firstChild).toHaveClass('selected');
	});

	it('renders without selected class', () => {
		const option = { id: '1', value: 'Value', label: 'Label' };
		const { container } = render(<OptionRenderer option={option} />);
		expect(container.firstChild).not.toHaveClass('selected');
	});
});
