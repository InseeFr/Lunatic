import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import VariableStatus from './variable-status';

describe('VariableStatus', () => {
	it('renders correctly with default props', () => {
		render(<VariableStatus />);
		expect(screen.getByTestId('variable-status')).toBeInTheDocument();
	});

	it('displays the tooltip when hovering over the image', () => {
		render(
			<VariableStatus>
				<div>Test</div>
			</VariableStatus>
		);
		const img = screen.getByAltText('img-tooltip');
		fireEvent.mouseOver(img);
		expect(screen.getByTestId('tooltip-lunatic')).toBeInTheDocument();
	});
});
