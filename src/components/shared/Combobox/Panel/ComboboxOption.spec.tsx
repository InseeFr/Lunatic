import { render } from '@testing-library/react';
import { ComboboxOption } from './ComboboxOption';
import { describe, it, expect } from 'vitest';

describe('DefaultOptionRenderer', () => {
	it('renders without label', () => {
		const option = { id: '1', value: 'Value' };
		const { getByText, queryByText } = render(
			<ComboboxOption option={option} />
		);
		const idElement = getByText(option.id);
		const labelElement = queryByText('-');
		expect(idElement).toBeInTheDocument();
		expect(labelElement).toBeNull();
	});

	it('renders with label and displays id by default', () => {
		const option = { id: '1', value: 'Value', label: 'Label' };
		const { getByText } = render(<ComboboxOption option={option} />);

		expect(getByText(option.id)).toBeInTheDocument();
		expect(getByText('-')).toBeInTheDocument();
		expect(getByText(option.label)).toBeInTheDocument();
	});

	it('renders with label and displays id when prop is true', () => {
		const option = { id: '1', value: 'Value', label: 'Label' };
		const { getByText } = render(
			<ComboboxOption option={option} shouldDisplayOptionId={true} />
		);

		expect(getByText(option.id)).toBeInTheDocument();
		expect(getByText('-')).toBeInTheDocument();
		expect(getByText(option.label)).toBeInTheDocument();
	});

	it('renders with label and does not display id when prop is false', () => {
		const option = { id: '1', value: 'Value', label: 'Label' };
		const { getByText, queryByText } = render(
			<ComboboxOption option={option} shouldDisplayOptionId={false} />
		);

		expect(queryByText(option.id)).not.toBeInTheDocument();
		expect(queryByText('-')).not.toBeInTheDocument();
		expect(getByText(option.label)).toBeInTheDocument();
	});

	it('renders with selected class', () => {
		const option = { id: '1', value: 'Value', label: 'Label' };
		const { container } = render(<ComboboxOption option={option} selected />);
		expect(container.firstChild).toHaveClass('selected');
	});

	it('renders without selected class', () => {
		const option = { id: '1', value: 'Value', label: 'Label' };
		const { container } = render(<ComboboxOption option={option} />);
		expect(container.firstChild).not.toHaveClass('selected');
	});
});
