import './Duration.scss';
import type { LunaticComponentProps } from '../type';
import { useState } from 'react';
import { getDurationFromValue } from './getDurationFromValue';
import { clampDuration, labelByUnit, propsByUnit } from './durationUtils';
import { formatDuration } from './formatDuration';
import classnames from 'classnames';
import { objectKeys } from '../../utils/object';
import { customizedComponent } from '../shared/HOC/customizedComponent';
import type { LunaticError } from '../../use-lunatic/type';
import {
	ComponentErrors,
	getComponentErrors,
} from '../shared/ComponentErrors/ComponentErrors';
import { Declarations } from '../shared/Declarations/Declarations';

export function Duration({
	handleChange,
	response,
	errors,
	...props
}: LunaticComponentProps<'Duration'>) {
	return (
		<CustomDuration
			{...props}
			onChange={(v) => handleChange(response, v)}
			errors={getComponentErrors(errors, props.id)}
		/>
	);
}

type CustomProps = Omit<
	LunaticComponentProps<'Duration'>,
	'response' | 'handleChange' | 'errors'
> & {
	onChange: (v: string | null) => void;
	errors?: LunaticError[];
};

export const CustomDuration = customizedComponent<CustomProps>(
	'Duration',
	(props) => {
		const { errors, value, label, format, onChange, declarations, id } = props;
		// We need to keep an internal state since one field can be empty (null value in duration)
		// but we still send "0" and we don't want the field to display "0"
		const [duration, setDuration] = useState(
			getDurationFromValue(value, format)
		);

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
				<Declarations
					type="AFTER_QUESTION_TEXT"
					declarations={declarations}
					id={id}
				/>
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
				<ComponentErrors errors={errors} />
			</fieldset>
		);
	}
);
