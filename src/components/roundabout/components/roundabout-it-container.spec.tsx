import { render, screen } from '@testing-library/react';
import RoundaboutItContainer from './roundabout-it-container';
import { describe, it, expect } from 'vitest';

describe('RoundaboutContainer', () => {
	it('renders children correctly', () => {
		render(
			<RoundaboutItContainer>
				<div>Child 1</div>
				<div>Child 2</div>
				<div>Child 3</div>
			</RoundaboutItContainer>
		);

		expect(screen.getByText('Child 1')).toBeInTheDocument();
		expect(screen.getByText('Child 2')).toBeInTheDocument();
		expect(screen.getByText('Child 3')).toBeInTheDocument();
	});
});
