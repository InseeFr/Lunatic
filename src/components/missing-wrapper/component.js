import React, { useEffect } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import Button from '../button';
import * as U from '../../utils/lib';
import './missing.scss';

const Missing = ({ Component, props }) => {
	const {
		dontKnowButton = "Don't know",
		refusedButton = 'Refused',
		missingResponse,
		handleChange,
		preferences,
		missingStrategy,
		missingShortcut = { dontKnow: '', refused: '' },
		response,
		responses,
		cells,
		components,
		savingType,
		bindings,
		shortcut,
	} = props;

	const buttonState = U.getResponseByPreference(preferences)(missingResponse);

	useEffect(() => {
		if (
			buttonState !== null &&
			U.hasToCleanMissing(savingType)({
				response,
				responses,
				cells,
				components,
			})
		) {
			handleChange({ [U.getResponseName(missingResponse)]: null });
		}
	}, [
		buttonState,
		handleChange,
		savingType,
		response,
		responses,
		cells,
		components,
		missingResponse,
	]);

	const getVarsToClean = () =>
		U.getToClean(savingType)({
			response,
			responses,
			cells,
			components,
		});

	const onClick = (value) => () => {
		const isSameValue = buttonState === value;
		const newValue = isSameValue ? null : value;
		const toClean = getVarsToClean();
		if (Object.keys(toClean)) {
			handleChange(toClean);
			if (U.isFunction(missingStrategy) && !isSameValue)
				missingStrategy({ ...bindings, ...toClean });
		} else {
			if (U.isFunction(missingStrategy) && !isSameValue)
				missingStrategy(bindings);
		}
		handleChange({ [U.getResponseName(missingResponse)]: newValue });
	};

	return (
		<div className="missing-wrapper">
			<div className="missing-component">
				<Component {...props} />
			</div>
			<div className="missing-buttons">
				<span
					className={`missing-button${
						buttonState === U.DK ? '-active' : ''
					} missing-button-dk${buttonState === U.DK ? '-active' : ''}`}
				>
					<Button
						label="dont-know-button"
						value={dontKnowButton}
						onClick={onClick(U.DK)}
					/>
				</span>
				<span
					className={`missing-button${
						buttonState === U.RF ? '-active' : ''
					} missing-button-rf${buttonState === U.RF ? '-active' : ''}`}
				>
					<Button
						label="refused-button"
						value={refusedButton}
						onClick={onClick(U.RF)}
					/>
				</span>
			</div>
			{shortcut &&
				missingShortcut &&
				missingShortcut.dontKnow &&
				missingShortcut.refused && (
					<KeyboardEventHandler
						handleKeys={Object.values(missingShortcut)}
						onKeyEvent={(key, e) => {
							e.preventDefault();
							if (key === missingShortcut.dontKnow) onClick(U.DK)();
							if (key === missingShortcut.refused) onClick(U.RF)();
						}}
						handleFocusableElements
					/>
				)}
		</div>
	);
};

export default Missing;
