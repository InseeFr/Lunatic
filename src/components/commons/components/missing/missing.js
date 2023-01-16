import './missing.scss';

import { DK, RF } from '../../../../utils/constants';
import React, { useCallback } from 'react';

import Button from '../../../button';
import D from '../../../../i18n';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { isElement } from '../../../../utils/is-element';
import useOnHandleChange from '../../use-on-handle-change';

const DEFAULT_SHORTCUT = { dontKnow: '', refused: '' };

const Missing = (props) => {
	const {
		dontKnowButton = D.DK,
		refusedButton = D.RF,
		missingResponse,
		handleChange,
		missingStrategy,
		missingShortcut = DEFAULT_SHORTCUT,
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

	const keyHandling = useCallback(
		(key, e) => {
			e.preventDefault();
			if (key === missingShortcut.dontKnow) onClick(DK)();
			if (key === missingShortcut.refused) onClick(RF)();
		},
		[missingShortcut.dontKnow, missingShortcut.refused, onClick]
	);

	if ((componentType === 'Loop' && paginatedLoop) || !missingResponse)
		return null;

	return (
		<div className="missing-buttons">
			<span
				className={`missing-button${
					value === DK ? '-active' : ''
				} missing-button-dk${value === DK ? '-active' : ''}`}
			>
				{isElement(dontKnowButton) ? (
					<Button onClick={onClickDK}>{dontKnowButton}</Button>
				) : (
					<Button label={dontKnowButton} onClick={onClickDK} />
				)}
			</span>
			<span
				className={`missing-button${
					value === RF ? '-active' : ''
				} missing-button-rf${value === RF ? '-active' : ''}`}
			>
				{isElement(refusedButton) ? (
					<Button onClick={onClickRF}>{refusedButton}</Button>
				) : (
					<Button label={refusedButton} onClick={onClickRF} />
				)}
			</span>
			{shortcut &&
				missingShortcut &&
				missingShortcut.dontKnow &&
				missingShortcut.refused && (
					<KeyboardEventHandler
						handleKeys={Object.values(missingShortcut)}
						onKeyEvent={keyHandling}
						handleFocusableElements
					/>
				)}
		</div>
	);
};

export default Missing;
