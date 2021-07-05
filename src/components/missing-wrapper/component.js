import React, { useState, useEffect } from 'react';
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
	} = props;
	const [buttonState, setButtonState] = useState(() =>
		U.getResponseByPreference(preferences)(missingResponse)
	);

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
			setButtonState(null);
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

	const clean = () => {
		const toClean = U.getToClean(savingType)({
			response,
			responses,
			cells,
			components,
		});
		if (Object.keys(toClean)) handleChange(toClean);
	};

	const onClick = (value) => () => {
		const isSameValue = buttonState === value;
		const newValue = isSameValue ? null : value;
		clean();
		if (U.isFunction(missingStrategy) && !isSameValue) missingStrategy();
		setButtonState(newValue);
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
