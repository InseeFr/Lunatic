import { useState } from 'react';
import { slottableComponent } from '../shared/HOC/slottableComponent';
import type { LunaticComponentProps } from '../type';
import { DatepickerField } from './DatepickerField';
import { LunaticError } from '../../use-lunatic/type';

type CustomProps = Omit<
	LunaticComponentProps<'Datepicker'>,
	'response' | 'handleChanges' | 'errors'
> & {
	onChange: (s: string | null) => void;
	errors?: LunaticError[];
};

export const CustomDatepickerFields = slottableComponent<CustomProps>(
	'DatepickerFields',
	(props) => {
		const {
			disabled,
			readOnly,
			value = '',
			dateFormat = 'YYYY-MM-DD',
			id,
			onChange,
		} = props;

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

			// Date is not valid, or date has a missing part
			if (
				(dateFormat === 'YYYY-MM-DD' && !isDateValid(numbers)) ||
				(hasNaNIndex > -1 && hasNaNIndex <= formatParts.length - 1)
			) {
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
						description="Exemple: 7"
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
		);
	}
);

function numbersFromDateString(s?: string): [number, number, number] {
	if (!s) {
		return [Number.NaN, Number.NaN, Number.NaN];
	}
	const [year, month, day] = s
		.split('-')
		.map((part) => Number.parseInt(part, 10));
	return [year, month, day];
}

/**
 * Check if the date provided by the user is valid (e.g. not 2001/02/29)
 */
function isDateValid(dateArray: [number, number, number]) {
	const [year, month, day] = dateArray;

	// do not set the date directly on new Date(), to avoid transformation on year between 0 and 99.
	//See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#year
	const date = new Date();
	date.setFullYear(year, month - 1, day);

	return (
		date.getFullYear() === year &&
		date.getMonth() === month - 1 &&
		date.getDate() === day
	);
}
