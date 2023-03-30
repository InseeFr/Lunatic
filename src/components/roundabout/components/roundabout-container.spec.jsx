import { render, screen } from '@testing-library/react';
import RoundaboutContainer from './roundabout-container';
import { describe, it, expect } from 'vitest';

describe('RoundaboutContainer', () => {
	it('renders children correctly', () => {
		render(
			<RoundaboutContainer>
				<div>Child 1</div>
				<div>Child 2</div>
				<div>Child 3</div>
			</RoundaboutContainer>
		);

		expect(screen.getByText('Child 1')).toBeInTheDocument();
		expect(screen.getByText('Child 2')).toBeInTheDocument();
		expect(screen.getByText('Child 3')).toBeInTheDocument();
	});
});
