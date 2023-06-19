import React, {
	ChangeEventHandler,
	ReactNode,
	useState,
	ChangeEvent,
} from 'react';
import { createCustomizableLunaticField, Errors, Label } from '../../commons';
import DatepickerInput from './datepicker-input';
import DatepickerContainer from './datepicker-container';
import './datepicker.scss';
import { LunaticError } from '../../../use-lunatic/type';

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
	onChange: (s: string) => void;
};

function Datepicker({
	disabled,
	readOnly,
	value = '',
	onChange,
	id,
	min,
	max,
	label,
	errors,
	description,
}: Props) {
	const labelId = `lunatic-datepicker-${id}`;

	// store the date value in the local date state
	const [date, setDate] = useState(value || '');

	// custom event handler to update date value
	const handleDateChange: ChangeEventHandler<HTMLInputElement> = (
		event: ChangeEvent<HTMLInputElement>
	) => {
		const { value: inputValue } = event.target;
		setDate(inputValue);
		if (onChange) {
			onChange(inputValue);
		}
	};
	return (
		<DatepickerContainer>
			<Label htmlFor={id} id={labelId} description={description}>
				{label}
			</Label>
			<DatepickerInput
				id={id}
				labelId={labelId}
				readOnly={readOnly}
				disabled={disabled}
				value={date}
				onChange={handleDateChange}
				min={min}
				max={max}
			/>
			<Errors errors={errors} activeId={id} />
		</DatepickerContainer>
	);
}

export default createCustomizableLunaticField(Datepicker, 'Datepicker');
