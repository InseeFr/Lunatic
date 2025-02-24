import { describe, expect, it } from 'vitest';
import { CharactersCount } from './CharactersCount';
import { render } from '@testing-library/react';

describe('CharactersCount', () => {
	const defaultProps = {
		id: 'test-id',
		maxLength: 20,
		value: 'Hello',
	};

	it('renders correctly characters count if there is a maximum length', () => {
		const { getByText } = render(<CharactersCount {...defaultProps} />);

		expect(getByText('5/20')).toBeInTheDocument();
	});

	it('should apply the max-length-reached class when limit is reached', () => {
		const props = { ...defaultProps, maxLength: 5 };
		const { getByText } = render(<CharactersCount {...props} />);

		expect(getByText('5/5')).toHaveClass('max-length-reached');
	});

	it('should not render anything when maxLength is not provided', () => {
		const props = { ...defaultProps, maxLength: undefined };
		const { container } = render(<CharactersCount {...props} />);

		expect(container.firstChild).toBeNull();
	});
});
