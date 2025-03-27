import { useState } from 'react';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'; // see https://github.com/mui/mui-x/issues/11470
import { fr } from 'date-fns/locale/fr';
import { parseISO, format } from 'date-fns';
import { slottableComponent } from '../shared/HOC/slottableComponent';
import type { DateFormat, LunaticComponentProps } from '../type';
import { Label } from '../shared/Label/Label';
import { Declarations } from '../shared/Declarations/Declarations';
import {
	ComponentErrors,
	getComponentErrors,
} from '../shared/ComponentErrors/ComponentErrors';
import type { LunaticError } from '../../use-lunatic/type';
import { DateView } from '@mui/x-date-pickers';
import { frFR } from '@mui/x-date-pickers/locales';

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
			min,
			max,
			onChange,
		} = props;
		const labelId = `lunatic-datepicker-${id}`;

		const parsedDate = value ? parseISO(value) : null;
		const parsedMinDate = min ? parseISO(min) : undefined;
		const parsedMaxDate = max ? parseISO(max) : undefined;
		const [selectedDate, setSelectedDate] = useState<Date | null>(parsedDate);

		const handleDateChange = (date: Date | null) => {
			setSelectedDate(date);
			// Convert the date back to the string format expected by the component
			onChange(date ? format(date, computeDateFnsFormat(dateFormat)) : null);
		};

		return (
			<div className="lunatic-datepicker">
				<Label htmlFor={id} id={labelId} description={description}>
					{label}
				</Label>
				<Declarations
					type="AFTER_QUESTION_TEXT"
					declarations={declarations}
					id={id}
				/>
				<LocalizationProvider
					dateAdapter={AdapterDateFns}
					adapterLocale={fr}
					localeText={
						frFR.components.MuiLocalizationProvider.defaultProps.localeText
					}
				>
					<MuiDatePicker
						className="datepicker"
						value={selectedDate}
						onChange={handleDateChange}
						format={computeDisplayedFormat(dateFormat)}
						views={getDatePickerViews(dateFormat)}
						disabled={disabled}
						readOnly={readOnly}
						minDate={parsedMinDate}
						maxDate={parsedMaxDate}
						slotProps={{
							field: { clearable: true },
							textField: {
								id: id,
							},
						}}
					/>
				</LocalizationProvider>
				<ComponentErrors errors={errors} />
			</div>
		);
	}
);

/**
 * Computes the displayed date format for the datepicker from the source format
 */
function computeDisplayedFormat(format: DateFormat) {
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
function computeDateFnsFormat(format: DateFormat) {
	// Replace 'YYYY' with 'yyyy' and 'DD' with 'dd', keeping 'MM', for compatibility with date-fns
	return format.replace('YYYY', 'yyyy').replace('DD', 'dd');
}

/**
 * Determines DatePicker views
 */
function getDatePickerViews(format: DateFormat): DateView[] {
	switch (format) {
		case 'YYYY-MM':
			return ['year', 'month'];
		case 'YYYY':
			return ['year'];
		case 'YYYY-MM-DD':
		default:
			return ['year', 'month', 'day'];
	}
}
