import React from 'react';
import { render } from '@testing-library/react';
import RoundaboutPending from './roundabout-pending';
import { describe, it, expect } from 'vitest';

describe('RoundaboutPending', () => {
	it('renders pending', () => {
		const { getByText } = render(<RoundaboutPending />);
		expect(getByText('Pending...')).toBeInTheDocument();
	});
});
