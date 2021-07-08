import React, { useEffect, useState } from 'react';
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
		response,
		responses,
		cells,
		components,
		savingType,
		bindings,
	} = props;

	const buttonState = U.getResponseByPreference(preferences)(missingResponse);

	const [init, setInit] = useState(false);
	useEffect(() => {
		if (!init) setInit(true);
	}, [init, buttonState]);

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

	// Trigger missingStrategy function when an external update data with handleChange
	useEffect(() => {
		if (
			init &&
			U.isFunction(missingStrategy) &&
			[U.DK, U.RF].includes(buttonState)
		) {
			missingStrategy();
		}
		// Assume this, we don't want to use missingStrategy at first time init=true
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [buttonState, missingStrategy]);

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
		</div>
	);
};

export default Missing;
