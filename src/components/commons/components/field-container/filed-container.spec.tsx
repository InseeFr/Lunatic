import React from 'react';
import { render, screen, logRoles } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import FieldContainer from './field-container';

describe('FieldContainer', () => {
	it('renders the children', () => {
		render(<FieldContainer>Test Children</FieldContainer>);
		expect(screen.getByText('Test Children')).toBeInTheDocument();
	});
	it('renders with field class if management is false', () => {
		render(<FieldContainer management={false}>Test Children</FieldContainer>);
		expect(screen.getByText('Test Children')).toHaveClass('field');
	});
	it('renders with field-with-tooltip class if management is true', () => {
		render(<FieldContainer management={true}>Test Children</FieldContainer>);
		expect(screen.getByText('Test Children')).toHaveClass('field-with-tooltip');
	});

	it('does not render the tooltip if management is false', () => {
		render(<FieldContainer management={false}>Test Children</FieldContainer>);
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
	});
});
