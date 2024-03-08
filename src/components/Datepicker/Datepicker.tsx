import { useState } from 'react';
import { DatepickerField } from './DatepickerField';
import { slottableComponent } from '../shared/HOC/slottableComponent';
import type { LunaticComponentProps } from '../type';
import { Label } from '../shared/Label/Label';
import {
	ComponentErrors,
	getComponentErrors,
} from '../shared/ComponentErrors/ComponentErrors';
import { Declarations } from '../shared/Declarations/Declarations';
import type { LunaticError } from '../../use-lunatic/type';

export function Datepicker({
	dateFormat = 'YYYY-MM-DD',
	response,
	handleChange,
	errors,
	...props
}: LunaticComponentProps<'Datepicker'>) {
	return (
		<CustomDatepicker
			{...props}
			dateFormat={dateFormat ?? 'YYYY-MM-DD'}
			onChange={(v) => handleChange(response, v)}
			errors={getComponentErrors(errors, props.id)}
		/>
	);
}

type CustomProps = Omit<
	LunaticComponentProps<'Datepicker'>,
	'response' | 'handleChange' | 'errors'
> & {
	onChange: (s: string | null) => void;
	errors?: LunaticError[];
};

export const CustomDatepicker = slottableComponent<CustomProps>(
	'Datepicker',
	(props) => {
		const {
			disabled,
			readOnly,
			value = '',
			dateFormat = 'YYYY-MM-DD',
			id,
			label,
			errors,
			description,
			declarations,
			onChange,
		} = props;
		const labelId = `lunatic-datepicker-${id}`;
		const showDay = dateFormat.includes('DD');
		const showMonth = dateFormat.includes('MM');

		// Raw state, we allow invalid dates to be typed
		const [numbers, setNumbers] = useState(() =>
			numbersFromDateString(value ?? undefined)
		);
		const setNumber = (index: number) => (value: number) => {
			const newNumbers = [...numbers] as typeof numbers;
			newNumbers[index] = value;
			setNumbers(newNumbers);
			onNumbersChange(newNumbers);
		};

		const onNumbersChange = (numbers: [number, number, number]) => {
			const formatParts = dateFormat.split('-');
			const hasNaNIndex = numbers.findIndex((v) => Number.isNaN(v));

			// Date has a missing part
			if (hasNaNIndex > -1 && hasNaNIndex <= formatParts.length - 1) {
				onChange(null);
				return;
			}

			// Date is not valid
			if (dateFormat === 'YYYY-MM-DD' && !isDateValid(numbers)) {
				onChange(null);
				return;
			}

			const result = formatParts
				.map((v, k) => numbers[k].toString().padStart(v.length, '0'))
				.join('-');
			onChange(result);
		};

		const extraProps = {
			readOnly,
			disabled,
		};

		return (
			<div className="lunatic-input">
				<Label htmlFor={id} id={labelId} description={description}>
					{label}
				</Label>
				<Declarations
					type="AFTER_QUESTION_TEXT"
					declarations={declarations}
					id={id}
				/>
				<div className="lunaticDatepickerFields">
					{showDay && (
						<DatepickerField
							id={id + 'day'}
							label="Jour"
							description="Exemple: 14"
							max={31}
							value={numbers[2]}
							onChange={setNumber(2)}
							{...extraProps}
						/>
					)}
					{showMonth && (
						<DatepickerField
							id={id + 'month'}
							label="Mois"
							description="Exemple: 07"
							max={12}
							value={numbers[1]}
							onChange={setNumber(1)}
							{...extraProps}
						/>
					)}
					<DatepickerField
						id={id + 'year'}
						label="Année"
						description="Exemple: 2023"
						value={numbers[0]}
						max={9999}
						onChange={setNumber(0)}
						{...extraProps}
					/>
				</div>
				<ComponentErrors errors={errors} />
			</div>
		);
	}
);

function numbersFromDateString(s?: string): [number, number, number] {
	if (!s) {
		return [NaN, NaN, NaN];
	}
	const parts = s.split('-');
	return [
		parseInt(parts[0], 10),
		parseInt(parts[1], 10),
		parseInt(parts[2], 10),
	];
}

function isDateValid(dateArray: [number, number, number]) {
	const [year, month, day] = dateArray;
	const date = new Date(year, month - 1, day);

	return (
		date.getFullYear() === year &&
		date.getMonth() === month - 1 &&
		date.getDate() === day
	);
}
