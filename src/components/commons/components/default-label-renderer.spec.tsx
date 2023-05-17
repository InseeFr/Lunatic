import React from 'react';
import { render } from '@testing-library/react';
import DefaultLabelRenderer from './default-label-renderer';
import { describe, it, expect } from 'vitest';
describe('DefaultLabelRenderer', () => {
	describe('DefaultLabelRenderer', () => {
		const option = {
			id: '1',
			value: 'Value',
			label: 'Label',
		};

		it('should render with selected option', () => {
			const { getByText } = render(
				<DefaultLabelRenderer option={option} placeholder="Select an option" />
			);

			const expectedContent = `${option.id || option.value} - ${option.label}`;
			expect(getByText(expectedContent)).toBeInTheDocument();
		});

		it('should render with placeholder', () => {
			const { getByText } = render(
				<DefaultLabelRenderer option={null} placeholder="Select an option" />
			);

			expect(getByText('Select an option')).toBeInTheDocument();
		});

		it('should render with search value', () => {
			const { getByText } = render(
				<DefaultLabelRenderer
					option={null}
					search="Search value"
					placeholder="Select an option"
				/>
			);

			expect(getByText('Search value')).toBeInTheDocument();
		});
	});
});
