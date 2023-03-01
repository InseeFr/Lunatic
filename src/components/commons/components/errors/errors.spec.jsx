import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Errors from './errors';

describe('Errors component', () => {
	const errors = {
		id1: [{ id: 'error1', errorMessage: 'Error 1 message' }],
		id2: [
			{ id: 'error2', errorMessage: 'Error 2 message' },
			{ id: 'error3', errorMessage: 'Error 3 message' },
		],
	};

	it('renders null when no active errors', () => {
		const { container } = render(<Errors errors={errors} activeId="id3" />);
		expect(container.firstChild).toBeNull();
	});

	it('renders active errors', () => {
		const { getByText } = render(<Errors errors={errors} activeId="id2" />);
		expect(getByText('Error 2 message')).toBeInTheDocument();
		expect(getByText('Error 3 message')).toBeInTheDocument();
	});
});
