export const minMaxValidatorInputNumber =
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
	const valueNumber = Number(value);
	if (!min && isDef(max) && valueNumber > max)
		return `La valeur doit être inférieure à ${max}`;
	else if (isDef(min) && !max && valueNumber < min)
		return `La valeur doit être supérieure à ${min}`;
	else if (isDef(min) && isDef(max) && (valueNumber < min || valueNumber > max))
		return `La valeur doit être comprise entre ${min} et ${max}`;
	return undefined;
};

const isDef = (number) => number || number === 0;
