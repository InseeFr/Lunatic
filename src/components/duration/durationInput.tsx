import { Fragment, useState } from 'react';
import { objectKeys } from '../../utils/object';
import { formatDuration } from './formatDuration';
import { getDurationFromValue } from './getDurationFromValue';
import { type Formats, labelByUnit, propsByUnit } from './durationUtils';

const DurationInput = ({
	value,
	format,
	onChange,
}: {
	value: string | null;
	format: Formats;
	onChange: (s: string | null) => void;
}) => {
	// We need to keep an internal state since one field can be empty (null value in duration)
	// but we still send "0" and we don't want the field to display "0"
	const [duration, setDuration] = useState(getDurationFromValue(value, format));

	// Generate handler for a specific unit field (year, month...)
	const changeHandler =
		(unit: string) =>
			(e: {
				// CheckValidity function is used to apply constraints to a field Ex: (min, max)
				target: { valueAsNumber: number; checkValidity: () => boolean };
			}) => {
				if (!e.target.checkValidity()) {
					return;
				}
				const fieldValue = Number.isNaN(e.target.valueAsNumber)
					? null
					: e.target.valueAsNumber;
				const newDuration = { ...duration, [unit]: fieldValue };
				onChange(formatDuration(newDuration));
				setDuration(newDuration);
			};

	return (
		<div className="field-group">
			<div className="input-field-group">
				{objectKeys(duration).map((unit) => (
					<Fragment key={unit}>
						<label htmlFor={`${unit}Input`} className="input-label">
							{labelByUnit[unit]}
						</label>
						<input
							id={`${unit}Input`}
							type="number"
							value={duration[unit] ?? ''}
							className="input-field"
							onChange={changeHandler(unit)}
							{...propsByUnit[unit]}
						/>
					</Fragment>
				))}
			</div>
		</div>
	);
};

export default DurationInput;
