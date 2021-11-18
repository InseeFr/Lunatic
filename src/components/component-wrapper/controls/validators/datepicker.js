import compareAsc from 'date-fns/compareAsc';
import format from 'date-fns/format';

export const minMaxValidatorDatepicker =
	({ min, max, id }) =>
	(value) => {
		const errorMessage = getMessage(min, max, value);
		if (errorMessage) return { id: `control-${id}`, errorMessage };
		return null;
	};

const getMessage = (min, max, value) => {
	if (!value) {
		return undefined;
	}
	const dateFormat = 'dd/MM/yyyy';
	const date = new Date(value);
	if (isNaN(Date.parse(min))) return undefined;
	if (isNaN(Date.parse(max))) return undefined;
	const minDate = new Date(min);
	const maxDate = new Date(max);
	const minDateAsString = minDate ? format(minDate, dateFormat) : '';
	const maxDateAsString = maxDate ? format(maxDate, dateFormat) : '';
	if (!min && isDef(max) && compareAsc(date, maxDate) > 0)
		return `La date doit être inférieure au ${maxDateAsString}`;
	else if (isDef(min) && !max && compareAsc(date, minDate) > 0)
		return `La date doit être supérieure au ${minDateAsString}`;
	else if (isDef(min) && isDef(max) && (date < minDate || date > maxDate))
		return `La date doit être comprise entre le ${minDateAsString} et le ${maxDateAsString}`;
	return undefined;
};

const isDef = (d) => d;
