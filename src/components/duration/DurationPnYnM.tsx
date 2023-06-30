import React from 'react';
import { handlerDurationValues } from './handlerDurationValues';
import { Formats } from './durationUtils';

interface DurationPnYnMProps {
	value: string | null;
	format: Formats;
	onChange: (newValue: string | null) => void;
}

const DurationPnYnM: React.FC<DurationPnYnMProps> = ({
	value,
	format,
	onChange,
}) => {
	const { propsYears, propsMonths } = handlerDurationValues(
		value ?? '',
		format,
		(newValue: string | null) => {
			const updatedValue = typeof newValue === 'string' ? newValue : '';
			onChange(updatedValue);
		}
	);

	return (
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
	);
};

export default DurationPnYnM;
