import React from 'react';
import { handlerDurationValues } from './handlerDurationValues';
import { Formats } from './durationUtils';

interface DurationPTnHnMProps {
	value: string | null;
	format: Formats;
	onChange: (newValue: string) => void;
}

const DurationPTnHnM: React.FC<DurationPTnHnMProps> = ({
	value,
	format,
	onChange,
}) => {
	const { propsHours, propsMinutes } = handlerDurationValues(
		value ?? '',
		format,
		(newValue: string | null) => {
			const updatedValue = newValue !== null ? newValue : '';
			onChange(updatedValue);
		}
	);

	return (
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
	);
};

export default DurationPTnHnM;
