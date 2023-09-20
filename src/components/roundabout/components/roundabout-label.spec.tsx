import React from 'react';
import { render } from '@testing-library/react';
import RoundaboutLabel from './roundabout-label';
import { describe, expect, it } from 'vitest';

describe('RoundaboutLabel', () => {
	it('renders the label', () => {
		const label = 'Test label';
		const { getByText } = render(<RoundaboutLabel value={label} />);
		expect(getByText(label)).toBeInTheDocument();
	});
});
