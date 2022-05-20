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

	const { value } = missingResponse;
	const onClick = useOnHandleChange({
		handleChange,
		response: missingResponse,
		value,
	});

	const onClickDK = useCallback(() => onClick(DK), [onClick]);
	const onClickRF = useCallback(() => onClick(RF), [onClick]);

	if ((componentType === 'Loop' && paginatedLoop) || !missingResponse)
		return null;

	return (
		<div className="missing-buttons">
			<span
				className={`missing-button${
					value === DK ? '-active' : ''
				} missing-button-dk${value === DK ? '-active' : ''}`}
			>
				<Button label={dontKnowButton} onClick={onClickDK} />
			</span>
			<span
				className={`missing-button${
					value === RF ? '-active' : ''
				} missing-button-rf${value === RF ? '-active' : ''}`}
			>
				<Button label={refusedButton} onClick={onClickRF} />
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
