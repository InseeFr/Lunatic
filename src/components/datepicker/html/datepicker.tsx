import {
	type ChangeEventHandler,
	type ReactNode,
	useCallback,
	useState,
} from 'react';
import { createCustomizableLunaticField, Errors, Label } from '../../commons';
import './datepicker.scss';
import type { LunaticError } from '../../../use-lunatic/type';
import { DatepickerField } from './DatepickerField';

type Props = {
	label?: ReactNode;
	description?: ReactNode;
	errors?: Record<string, LunaticError[]>;
	disabled?: boolean;
	readOnly?: boolean;
	min?: string;
	max?: string;
	id?: string;
	value?: string;
	onChange: (s: string | null) => void;
	format?: string;
};

function Datepicker({
	disabled,
	readOnly,
	value = '',
	format = 'YYYY-MM-DD',
	onChange,
	id,
	label,
	errors,
	description,
}: Props) {
	const labelId = `lunatic-datepicker-${id}`;
	const showDay = format.includes('DD');
	const showMonth = format.includes('MM');

	// Raw state, we allow invalid dates to be typed
	const [numbers, setNumbers] = useState(() => numbersFromDateString(value));
	const setNumber = (index: number) => (value: number) => {
		const newNumbers = [...numbers] as typeof numbers;
		newNumbers[index] = value;
		setNumbers(newNumbers);
		handleChange(newNumbers);
	};

	const handleChange = (numbers: [number, number, number]) => {
		const formatParts = format.split('-');
		const hasNaNIndex = numbers.findIndex((v) => Number.isNaN(v));

		// Date has a missing part
		if (hasNaNIndex > -1 && hasNaNIndex <= formatParts.length - 1) {
			onChange(null);
			return;
		}

		// Date is not valid
		if (format === 'YYYY-MM-DD' && !isDateValid(numbers)) {
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
					onChange={setNumber(0)}
					{...extraProps}
				/>
			</div>
			<Errors errors={errors} activeId={id} />
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

export default createCustomizableLunaticField(Datepicker, 'Datepicker');
