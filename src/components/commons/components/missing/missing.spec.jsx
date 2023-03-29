import { render, fireEvent } from '@testing-library/react';
import { MissingPure as Missing } from './missing';
import { describe, it, expect, vi, afterEach } from 'vitest';

describe('Missing', () => {
	const handleChange = vi.fn();
	const missingResponse = {
		name: 'Demo',
		value: '',
	};
	const dontKnowButton = "Don't know";
	const refusedButton = 'Refused';

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('should render the "Don\'t Know" and "Refused" buttons', () => {
		const { getByText } = render(
			<Missing
				dontKnowButton={dontKnowButton}
				refusedButton={refusedButton}
				missingResponse={missingResponse}
				handleChange={handleChange}
				missingShortcut={{ dontKnow: '', refused: '' }}
				missingStrategy={() => {}}
				shortcut={false}
			/>
		);
		const dontKnow = getByText(dontKnowButton);
		const refused = getByText(refusedButton);
		expect(dontKnow).toBeInTheDocument();
		expect(refused).toBeInTheDocument();
	});

	it('should call the handleChange function when a button is clicked', () => {
		const { getByText } = render(
			<Missing
				dontKnowButton={dontKnowButton}
				refusedButton={refusedButton}
				missingResponse={missingResponse}
				handleChange={handleChange}
				missingShortcut={{ dontKnow: '', refused: '' }}
				missingStrategy={() => {}}
				shortcut={false}
			/>
		);
		const dontKnow = getByText(dontKnowButton);
		const refused = getByText(refusedButton);
		fireEvent.click(dontKnow);
		fireEvent.click(refused);
		expect(handleChange).toHaveBeenCalledTimes(2);
		expect(handleChange).toHaveBeenCalledWith(missingResponse, 'DK');
		expect(handleChange).toHaveBeenCalledWith(missingResponse, 'RF');
	});

	it('should not handle keyboard shortcuts when a shortcut is not provided', () => {
		render(
			<Missing
				dontKnowButton={dontKnowButton}
				refusedButton={refusedButton}
				missingResponse={missingResponse}
				handleChange={handleChange}
				missingShortcut={{ dontKnow: '', refused: '' }}
				missingStrategy={() => {}}
				shortcut={false}
			/>
		);
		const body = document.body;
		fireEvent.click(body, { key: 'd' });
		fireEvent.click(body, { key: 'r' });
		expect(handleChange).toHaveBeenCalledTimes(0);
	});
});
