import React from 'react';
import { render } from '@testing-library/react';
import Redirect from './redirect';
import { describe, it, expect, vi } from 'vitest';

describe('Redirect', () => {
	it('calls goToIteration with iteration when mounted', () => {
		const iteration = 3;
		const goToIterationMock = vi.fn();
		render(
			<Redirect goToIteration={goToIterationMock} iteration={iteration} />
		);
		expect(goToIterationMock).toHaveBeenCalledWith(iteration);
	});
});
