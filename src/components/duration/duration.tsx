import React, { ReactNode } from 'react';
import './duration.scss';
import { useDurationValues } from './useDurationValues';
import { useOnHandleChange } from '../commons';

type Formats = 'PTnHnM' | 'PnYnM';
const Duration = ({
	value,
	label,
	format,
	handleChange,
	response,
}: {
	value: string;
	label: ReactNode;
	format: Formats;
	handleChange: any;
	response: any;
}) => {
	const onChange = useOnHandleChange({
		handleChange,
		response,
		value,
	});

	const { propsHours, propsMinutes, propsYears, propsMonths } =
		useDurationValues(value, format, onChange);
	return (
		<div className="container">
			{label}
			<div></div>
			{format === 'PTnHnM' && (
				<div className="field-group">
					<div className="input-field-group">
						<label htmlFor="hoursInput" className="input-label">
							Heures:
						</label>
						<input
							id="hoursInput"
							type="number"
							{...propsHours}
							className="input-field"
						/>
					</div>
					<div className="input-field-group">
						<label htmlFor="minutesInput" className="input-label">
							Minutes:
						</label>
						<input
							id="minutesInput"
							type="number"
							{...propsMinutes}
							min="0"
							className="input-field"
						/>
					</div>
				</div>
			)}
			{format === 'PnYnM' && (
				<div className="field-group">
					<div className="input-field-group">
						<label htmlFor="yearsInput" className="input-label">
							Années:
						</label>
						<input
							id="yearsInput"
							type="number"
							{...propsYears}
							min="0"
							className="input-field"
						/>
					</div>
					<div className="input-field-group">
						<label htmlFor="monthsInput" className="input-label">
							Mois:
						</label>
						<input
							id="monthsInput"
							type="number"
							{...propsMonths}
							min="0"
							className="input-field"
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default Duration;
