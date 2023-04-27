import React from 'react';
import { render } from '@testing-library/react';
import RoundaboutItTitle from './roundabout-it-title';
import { describe, it, expect } from 'vitest';

describe('RoundaboutItTitle', () => {
	it('renders the label', () => {
		const label = 'Test label';
		const { getByText } = render(<RoundaboutItTitle label={label} />);
		expect(getByText(label)).toBeInTheDocument();
	});
});
