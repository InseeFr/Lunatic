import React, { useState, useEffect } from 'react';
import Button from '../button';
import * as U from '../../utils/lib';
import './missing.scss';

const Missing = ({ Component, componentProps }) => {
	const {
		dontKnowButton = "Don't know",
		refusedButton = 'Refused',
		missingResponse,
		handleChange,
		preferences,
	} = componentProps;
	const [buttonState, setButtonState] = useState(() =>
		U.getResponseByPreference(preferences)(missingResponse)
	);

	// Assume we only want to handle enable external updates
	// Don't need to check all value changes
	useEffect(() => {
		if (U.getResponseByPreference(preferences)(missingResponse) !== buttonState)
			setButtonState(U.getResponseByPreference(preferences)(missingResponse));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [missingResponse, preferences]);

	return (
		<div className="missing-wrapper">
			<div className="missing-component">
				<Component {...componentProps} />
			</div>
			<div className="missing-buttons">
				<span
					className={`missing-button${buttonState === U.DK ? '-active' : ''}`}
				>
					<Button
						label="dont-know-button"
						value={dontKnowButton}
						onClick={() => {
							const newValue = buttonState === U.DK ? null : U.DK;
							setButtonState(newValue);
							handleChange({ [U.getResponseName(missingResponse)]: newValue });
						}}
					/>
				</span>
				<span
					className={`missing-button${buttonState === U.RF ? '-active' : ''}`}
				>
					<Button
						label="refused-button"
						value={refusedButton}
						onClick={() => {
							const newValue = buttonState === U.RF ? null : U.RF;
							setButtonState(newValue);
							handleChange({ [U.getResponseName(missingResponse)]: newValue });
						}}
					/>
				</span>
			</div>
		</div>
	);
};

export default Missing;
