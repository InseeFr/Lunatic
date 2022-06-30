import { isElement } from 'utils/is-element';

function safetyLabel(label) {
	if (
		typeof label === 'string' ||
		typeof label === 'boolean' ||
		typeof label === 'number'
	) {
		return label;
	}
	if (typeof label === 'object') {
		if (isElement(label)) return label;
		const { value } = label;
		if (typeof value === 'string') {
			return value;
		}
	}
	if (typeof label === 'function') {
		return label;
	}

	return ``;
}

export default safetyLabel;
