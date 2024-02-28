import { render } from '@testing-library/react';
import { RoundaboutRedirect } from './RoundaboutRedirect';
import { describe, it, expect, vi } from 'vitest';

describe('Redirect', () => {
	it('calls goToIteration with iteration when mounted', () => {
		const iteration = 3;
		const goToIterationMock = vi.fn();
		render(
			<RoundaboutRedirect
				goToIteration={goToIterationMock}
				iteration={iteration}
			/>
		);
		expect(goToIterationMock).toHaveBeenCalledWith(iteration);
	});
});
