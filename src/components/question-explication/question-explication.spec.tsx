import { render, fireEvent, waitFor } from '@testing-library/react';
import QuestionExplication from './lunatic-question-explication';
import { describe, it, expect } from 'vitest';
describe('QuestionExplication', () => {
    const mockProps = {
        id: 'test-accordion',
        label: 'Test Accordion Label',
        content: 'Test Accordion Content',
    };

    it('render accordion and check that label is on DOM and content node is hidden', () => {
        const { getByText, container } = render(<QuestionExplication {...mockProps} />);
        const accordionLabel = getByText(mockProps.label);
        expect(accordionLabel).toBeInTheDocument();
        expect(container.getElementsByClassName('accordion-content').length).toBe(0);

    });

    it('expands content on label click', async () => {
        const { getByText, container } = render(<QuestionExplication {...mockProps} />);
        const accordionLabel = getByText(mockProps.label);
        fireEvent.click(accordionLabel);
        await waitFor(() => expect(container.getElementsByClassName('accordion-content').length).toBe(1));
    });
});
