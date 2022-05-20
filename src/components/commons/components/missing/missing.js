import React, { useCallback } from 'react';
import useOnHandleChange from '../../use-on-handle-change';
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
		value,
		preferences,
		missingStrategy,
		missingShortcut = DEFAULT_SHORTCUT,
		response,
		responses,
		cells,
		components,
		savingType,
		shortcut,
		componentType,
		paginatedLoop,
	} = props;

	const buttonState = null;
	const onChange = useOnHandleChange({
		handleChange,
		response: missingResponse,
		value,
	});
	const onClick = useCallback(() => {}, []);

	if ((componentType === 'Loop' && paginatedLoop) || !missingResponse)
		return null;
	const { name } = missingResponse;
	return (
		<div className="missing-buttons">
			<span
				className={`missing-button${
					buttonState === DK ? '-active' : ''
				} missing-button-dk${buttonState === DK ? '-active' : ''}`}
			>
				<Button label={dontKnowButton} onClick={onClick(DK)} />
			</span>
			<span
				className={`missing-button${
					buttonState === RF ? '-active' : ''
				} missing-button-rf${buttonState === RF ? '-active' : ''}`}
			>
				<Button label={refusedButton} onClick={onClick(RF)} />
			</span>
			{shortcut &&
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
