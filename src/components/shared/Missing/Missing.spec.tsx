import { render, fireEvent } from '@testing-library/react';
import { MissingPure } from './Missing';
import { describe, it, expect, vi, afterEach } from 'vitest';

describe('Missing', () => {
	const handleChanges = vi.fn();
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
			<MissingPure
				dontKnowButton={dontKnowButton}
				refusedButton={refusedButton}
				missingResponse={missingResponse}
				handleChanges={handleChanges}
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

	it('should call the handleChanges function when a button is clicked', () => {
		const { getByText } = render(
			<MissingPure
				dontKnowButton={dontKnowButton}
				refusedButton={refusedButton}
				missingResponse={missingResponse}
				handleChanges={handleChanges}
				missingShortcut={{ dontKnow: '', refused: '' }}
				missingStrategy={() => {}}
				shortcut={false}
			/>
		);
		const dontKnow = getByText(dontKnowButton);
		const refused = getByText(refusedButton);
		fireEvent.click(dontKnow);
		fireEvent.click(refused);
		expect(handleChanges).toHaveBeenCalledTimes(2);
		expect(handleChanges).toHaveBeenCalledWith([
			{ ...missingResponse, value: 'DK' },
		]);
		expect(handleChanges).toHaveBeenCalledWith([
			{ ...missingResponse, value: 'RF' },
		]);
	});

	it('should not handle keyboard shortcuts when a shortcut is not provided', () => {
		render(
			<MissingPure
				dontKnowButton={dontKnowButton}
				refusedButton={refusedButton}
				missingResponse={missingResponse}
				handleChanges={handleChanges}
				missingShortcut={{ dontKnow: '', refused: '' }}
				missingStrategy={() => {}}
				shortcut={false}
			/>
		);
		const body = document.body;
		fireEvent.click(body, { key: 'd' });
		fireEvent.click(body, { key: 'r' });
		expect(handleChanges).toHaveBeenCalledTimes(0);
	});
});
