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
	const dateFormat = 'dd-MM-yyyy';
	const date = new Date(value);
	if (isDef(min) && isDef(max)) {
		const minDate = new Date(min);
		const maxDate = new Date(max);
		if (date < minDate || date > maxDate) {
			const minDateAsString = minDate ? format(minDate, dateFormat) : '';
			const maxDateAsString = maxDate ? format(maxDate, dateFormat) : '';
			return `La date doit être comprise entre le ${minDateAsString} et le ${maxDateAsString}`;
		}
	}
	if (isDef(min)) {
		const minDate = new Date(min);
		if (compareAsc(date, minDate) < 0) {
			const minDateAsString = minDate ? format(minDate, dateFormat) : '';
			return `La date doit être supérieure au ${minDateAsString}`;
		}
	}
	if (isDef(max)) {
		const maxDate = new Date(max);
		if (compareAsc(date, maxDate) > 0) {
			const maxDateAsString = maxDate ? format(maxDate, dateFormat) : '';
			return `La date doit être inférieure au ${maxDateAsString}`;
		}
	}
	return undefined;
};

const isDef = (d) => !isNaN(Date.parse(d));
