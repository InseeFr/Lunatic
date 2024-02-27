import './Duration.scss';
import type { LunaticComponentProps } from '../type';
import { useState } from 'react';
import { getDurationFromValue } from './getDurationFromValue';
import { clampDuration, labelByUnit, propsByUnit } from './durationUtils';
import { formatDuration } from './formatDuration';
import classnames from 'classnames';
import { objectKeys } from '../../utils/object';
import { customizedComponent } from '../shared/HOC/customizedComponent';

function LunaticDuration({
	value,
	label,
	format,
	handleChange,
	response,
}: LunaticComponentProps<'Duration'>) {
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
			handleChange(response, formatDuration(newDuration));
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
}

export const Duration = customizedComponent('Duration', LunaticDuration);
