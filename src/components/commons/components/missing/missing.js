import './missing.scss';

import React, { useCallback } from 'react';
import { DK, RF } from '../../../../utils/constants';

import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useLunaticMissing } from '../../../../use-lunatic/lunatic-context';
import Button from '../../../button';
import useOnHandleChange from '../../use-on-handle-change';

const Missing = (props) => {
	const { missingResponse, handleChange, componentType, paginatedLoop } = props;
	const {
		missing,
		missingStrategy,
		shortcut,
		missingShortcut,
		dontKnowButton,
		refusedButton,
	} = useLunaticMissing();
	const value = missingResponse?.value;
	const onClick = useOnHandleChange({
		handleChange,
		response: missingResponse,
		value,
	});

	const handleMissingStrategy = useCallback(() => {
		if (missingStrategy) missingStrategy();
	}, [missingStrategy]);

	const onClickDK = useCallback(() => {
		onClick(DK);
		handleMissingStrategy();
	}, [onClick, handleMissingStrategy]);

	const onClickRF = useCallback(() => {
		onClick(RF);
		handleMissingStrategy();
	}, [onClick, handleMissingStrategy]);

	if (!(missing && missingResponse)) return null;
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
						handleEventType="keydown"
						onKeyEvent={(key, e) => {
							e.preventDefault();
							if (key === missingShortcut.dontKnow) onClickDK();
							if (key === missingShortcut.refused) onClickRF();
						}}
						handleFocusableElements
					/>
				)}
		</div>
	);
};

export default Missing;
