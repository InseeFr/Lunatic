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
	} = props;
	const [buttonState, setButtonState] = useState(() =>
		U.getResponseByPreference(preferences)(missingResponse)
	);

	const onClick = (value) => () => {
		const newValue = buttonState === value ? null : value;
		if (U.isFunction(missingStrategy)) missingStrategy();
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
					className={`missing-button${buttonState === U.DK ? '-active' : ''}`}
				>
					<Button
						label="dont-know-button"
						value={dontKnowButton}
						onClick={onClick(U.DK)}
					/>
				</span>
				<span
					className={`missing-button${buttonState === U.RF ? '-active' : ''}`}
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
