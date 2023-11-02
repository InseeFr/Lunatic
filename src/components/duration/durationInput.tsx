import { type ReactNode, useState } from 'react';
import { objectKeys } from '../../utils/object';
import { formatDuration } from './formatDuration';
import { getDurationFromValue } from './getDurationFromValue';
import {
	clampDuration,
	type Formats,
	labelByUnit,
	propsByUnit,
} from './durationUtils';
import classnames from 'classnames';

type Props = {
	label?: ReactNode;
	id?: string;
	value: string | null;
	format: Formats;
	onChange: (s: string | null) => void;
};

const DurationInput = ({ value, format, onChange, label }: Props) => {
	// We need to keep an internal state since one field can be empty (null value in duration)
	// but we still send "0" and we don't want the field to display "0"
	const [duration, setDuration] = useState(getDurationFromValue(value, format));

	// Generate handler for a specific unit field (year, month...)
	const changeHandler =
		(unit: 'hours' | 'minutes' | 'months' | 'years') =>
		(e: {
			// CheckValidity function is used to apply constraints to a field Ex: (min, max)
			target: { valueAsNumber: number; checkValidity: () => boolean };
		}) => {
			if (!e.target.checkValidity()) {
				return;
			}
			const fieldValue = clampDuration(
				Number.isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber,
				unit
			);
			const newDuration = { ...duration, [unit]: fieldValue };
			onChange(formatDuration(newDuration));
			setDuration(newDuration);
		};

	return (
		<fieldset className={classnames('lunatic-input')}>
			{label && <legend>{label}</legend>}
			<div className="duration-fields">
				{objectKeys(duration).map((unit) => (
					<div className="duration-field" key={unit}>
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
					</div>
				))}
			</div>
		</fieldset>
	);
};

export default DurationInput;
