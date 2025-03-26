import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { slottableComponent } from '../shared/HOC/slottableComponent';
import type { LunaticComponentProps } from '../type';
import { Label } from '../shared/Label/Label';
import { Declarations } from '../shared/Declarations/Declarations';
import {
	ComponentErrors,
	getComponentErrors,
} from '../shared/ComponentErrors/ComponentErrors';
import type { LunaticError } from '../../use-lunatic/type';
import { parseISO, format } from 'date-fns';
import { fr } from 'date-fns/locale';

export function Datepicker({
	dateFormat = 'YYYY-MM-DD',
	response,
	handleChanges,
	errors,
	...props
}: LunaticComponentProps<'Datepicker'>) {
	return (
		<CustomDatepicker
			{...props}
			dateFormat={dateFormat}
			onChange={(value) => handleChanges([{ name: response.name, value }])}
			errors={getComponentErrors(errors, props.id)}
		/>
	);
}

type CustomProps = Omit<
	LunaticComponentProps<'Datepicker'>,
	'response' | 'handleChanges' | 'errors'
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
			value,
			dateFormat,
			id,
			label,
			errors,
			description,
			declarations,
			onChange,
		} = props;
		const labelId = `lunatic-datepicker-${id}`;

		// Convert value string ("YYYY-MM-DD") to Date object
		const parsedDate = value ? parseISO(value) : null;
		const [selectedDate, setSelectedDate] = useState<Date | null>(parsedDate);

		const handleDateChange = (date: Date | null) => {
			setSelectedDate(date);
			// Convert the date back to the string format expected by the component
			onChange(date ? format(date, computeDateFnsFormat(dateFormat)) : null);
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
				<ReactDatePicker
					id={id}
					selected={selectedDate}
					onChange={handleDateChange}
					dateFormat={computeDisplayedFormat(dateFormat)}
					isClearable
					disabled={disabled || readOnly}
					placeholderText={computePlaceholder(dateFormat)}
					showMonthYearPicker={dateFormat === 'YYYY-MM'}
					showYearPicker={dateFormat === 'YYYY'}
					locale={fr}
				/>
				<ComponentErrors errors={errors} />
			</div>
		);
	}
);

/**
 * Computes the displayed date format for the datepicker from the source format
 */
function computeDisplayedFormat(format: 'YYYY-MM-DD' | 'YYYY-MM' | 'YYYY') {
	switch (format) {
		case 'YYYY-MM':
			return 'MM/yyyy';
		case 'YYYY':
			return 'yyyy';
		case 'YYYY-MM-DD':
		default:
			return 'dd/MM/yyyy';
	}
}

/**
 * Computes the placeholder text (in french) for the input field from the source format
 */
function computePlaceholder(format: 'YYYY-MM-DD' | 'YYYY-MM' | 'YYYY') {
	switch (format) {
		case 'YYYY-MM':
			return 'mm / aaaa';
		case 'YYYY':
			return 'aaaa';
		case 'YYYY-MM-DD':
		default:
			return 'jj / mm / aaaa';
	}
}

/**
 * Computes the date format understood by the 'date-fns' library from the source format
 */
function computeDateFnsFormat(format: 'YYYY-MM-DD' | 'YYYY-MM' | 'YYYY') {
	// Replace 'YYYY' with 'yyyy' and 'DD' with 'dd', keeping 'MM', for compatibility with date-fns
	return format.replace('YYYY', 'yyyy').replace('DD', 'dd');
}
