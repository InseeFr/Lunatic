import { useState } from 'react';
import { DatepickerField } from './DatepickerField';
import './Datepicker.scss';
import { customizedComponent } from '../shared/HOC/customizedComponent';
import type { LunaticComponentProps } from '../type';
import { Label } from '../shared/Label/Label';
import { ComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import { Declarations } from '../shared/Declarations/Declarations';

export function LunaticDatepicker({
	disabled,
	readOnly,
	value = '',
	dateFormat = 'YYYY-MM-DD',
	response,
	id,
	handleChange,
	label,
	errors,
	description,
	declarations,
}: LunaticComponentProps<'Datepicker'>) {
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
		onChange(newNumbers);
	};

	const onChange = (numbers: [number, number, number]) => {
		const formatParts = dateFormat.split('-');
		const hasNaNIndex = numbers.findIndex((v) => Number.isNaN(v));

		// Date has a missing part
		if (hasNaNIndex > -1 && hasNaNIndex <= formatParts.length - 1) {
			handleChange(response, null);
			return;
		}

		// Date is not valid
		if (dateFormat === 'YYYY-MM-DD' && !isDateValid(numbers)) {
			handleChange(response, null);
			return;
		}

		const result = formatParts
			.map((v, k) => numbers[k].toString().padStart(v.length, '0'))
			.join('-');
		handleChange(response, result);
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
			<ComponentErrors errors={errors} componentId={id} />
		</div>
	);
}

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

export const Datepicker = customizedComponent('Datepicker', LunaticDatepicker);
