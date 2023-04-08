import React from 'react';
import { render } from '@testing-library/react';
import ModalContainer from './modal-container';
import { describe, it, expect } from 'vitest';

describe('ModalContainer component', () => {
	it('renders children in modal content element and creates portal in document body', () => {
		const children = <div>Test modal content</div>;
		const { getByText } = render(<ModalContainer>{children}</ModalContainer>);
		const modalContentElement = getByText('Test modal content');
		expect(modalContentElement).toBeInTheDocument();
		expect(modalContentElement.parentNode).toHaveClass('modal-content');
		expect(modalContentElement.parentNode!.parentNode).toHaveClass(
			'lunatic-modal-controls'
		);
	});
});
