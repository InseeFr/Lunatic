import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Button from '../../../button';
import { DK, RF } from 'utils/constants';
import './missing.scss';

const DEFAULT_SHORTCUT = { dontKnow: '', refused: '' };

const Missing = (props) => {
	const {
		dontKnowButton = "Don't know",
		refusedButton = 'Refused',
		missingResponse,
		handleChange,
		preferences,
		missingStrategy,
		missingShortcut = DEFAULT_SHORTCUT,
		response,
		responses,
		cells,
		components,
		savingType,
		bindings,
		shortcut,
		componentType,
		paginatedLoop,
	} = props;

	const buttonState = null;
	const missingResponseName = 'PRODUCER';
	const onClick = console.log;

	if ((componentType === 'Loop' && paginatedLoop) || !missingResponse)
		return null;

	return (
		<div className="missing-buttons">
			<span
				className={`missing-button${
					buttonState === DK ? '-active' : ''
				} missing-button-dk${buttonState === DK ? '-active' : ''}`}
			>
				<Button
					label="dont-know-button"
					value={dontKnowButton}
					disabled={!missingResponseName || missingResponseName?.length === 0}
					onClick={onClick(DK)}
				/>
			</span>
			<span
				className={`missing-button${
					buttonState === RF ? '-active' : ''
				} missing-button-rf${buttonState === RF ? '-active' : ''}`}
			>
				<Button
					label="refused-button"
					value={refusedButton}
					disabled={!missingResponseName || missingResponseName?.length === 0}
					onClick={onClick(RF)}
				/>
			</span>
			{shortcut &&
				missingResponseName?.length > 0 &&
				missingShortcut &&
				missingShortcut.dontKnow &&
				missingShortcut.refused && (
					<KeyboardEventHandler
						handleKeys={Object.values(missingShortcut)}
						onKeyEvent={(key, e) => {
							e.preventDefault();
							if (key === missingShortcut.dontKnow) onClick(DK)();
							if (key === missingShortcut.refused) onClick(RF)();
						}}
						handleFocusableElements
					/>
				)}
		</div>
	);
};

export default Missing;
