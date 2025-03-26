import { forwardRef, useState } from 'react';
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
import { InputMask, InputMaskProps } from '@react-input/mask';

interface MaskedInputProps extends InputMaskProps {
	format: 'YYYY-MM-DD' | 'YYYY-MM' | 'YYYY';
}

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
					showMonthYearPicker={dateFormat === 'YYYY-MM'}
					showYearPicker={dateFormat === 'YYYY'}
					locale={fr}
					customInput={<MaskedInput format={dateFormat} />}
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
 * Computes the date format understood by the 'date-fns' library from the source format
 */
function computeDateFnsFormat(format: 'YYYY-MM-DD' | 'YYYY-MM' | 'YYYY') {
	// Replace 'YYYY' with 'yyyy' and 'DD' with 'dd', keeping 'MM', for compatibility with date-fns
	return format.replace('YYYY', 'yyyy').replace('DD', 'dd');
}

/**
 * Computes the mask (in french) for the datepicker input from the source format
 */
function computeDateMask(format: 'YYYY-MM-DD' | 'YYYY-MM' | 'YYYY') {
	switch (format) {
		case 'YYYY-MM':
			return 'mm/aaaa';
		case 'YYYY':
			return 'aaaa';
		case 'YYYY-MM-DD':
		default:
			return 'jj/mm/aaaa';
	}
}

const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
	({ onChange, format, ...otherProps }, ref) => {
		const mask = computeDateMask(format);

		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			if (onChange) {
				onChange(event);
			}

			// move cursor for avoiding separator
			moveCursorAfterSlash(event);
		};

		return (
			<InputMask
				ref={ref}
				{...otherProps}
				mask={mask}
				replacement={{ j: /\d/, m: /\d/, a: /\d/ }}
				onChange={handleChange}
				placeholder={mask}
				showMask
				separate
				type="text"
			/>
		);
	}
);

const moveCursorAfterSlash = (event: React.ChangeEvent<HTMLInputElement>) => {
	const input = event.target;
	const cursorPos = input.selectionStart;
	const value = input.value;

	// If the cursor is right after 'jj' or 'mm', move it to the next position
	if (
		cursorPos !== null &&
		cursorPos < value.length &&
		value[cursorPos] === '/'
	) {
		input.setSelectionRange(cursorPos + 1, cursorPos + 1);
	}
};
