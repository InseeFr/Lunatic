import React from 'react';
import { getByText, render } from '@testing-library/react';
import RoundaboutLabel from './roundabout-label';
import { describe, it, expect } from 'vitest';

describe('RoundaboutLabel', () => {
	it('renders the label', () => {
		const label = 'Test label';
		const { getByText } = render(<RoundaboutLabel value={label} />);
		expect(getByText(label)).toBeInTheDocument();
	});
});
