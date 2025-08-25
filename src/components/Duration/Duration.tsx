import type { LunaticComponentProps } from '../type';
import { useState } from 'react';
import { getDurationFromValue } from './getDurationFromValue';
import { clampDuration, labelByUnit, propsByUnit } from './durationUtils';
import { formatDuration } from './formatDuration';
import classnames from 'classnames';
import { objectKeys } from '../../utils/object';
import { slottableComponent } from '../shared/HOC/slottableComponent';
import type { LunaticError } from '../../use-lunatic/type';
import {
	ComponentErrors,
	getComponentErrors,
} from '../shared/ComponentErrors/ComponentErrors';
import { Declarations } from '../shared/Declarations/Declarations';
import { Fieldset } from '../shared/Fieldset/Fieldset';

export function Duration({
	handleChanges,
	response,
	errors,
	...props
}: LunaticComponentProps<'Duration'>) {
	const { id, iteration } = props;
	// We can have the same id (same variable) for different iterations in successive pages, we need to have unique key for remount correctly
	const durationKey = `${id}-${iteration}`;

	return (
		<CustomDuration
			{...props}
			key={durationKey}
			onChange={(value) => handleChanges([{ name: response.name, value }])}
			errors={getComponentErrors(errors, id)}
		/>
	);
}

type CustomProps = Omit<
	LunaticComponentProps<'Duration'>,
	'response' | 'handleChanges' | 'errors'
> & {
	onChange: (v: string | null) => void;
	errors?: LunaticError[];
};

export const CustomDuration = slottableComponent<CustomProps>(
	'Duration',
	(props) => {
		const {
			errors,
			value,
			label,
			format,
			onChange,
			declarations,
			id,
			description,
		} = props;
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
			<Fieldset
				className={classnames('lunatic-input')}
				legend={label}
				description={description}
			>
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
			</Fieldset>
		);
	}
);
