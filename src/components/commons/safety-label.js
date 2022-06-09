import { VTL } from 'utils/constants';

function safetyLabel(label, idComponent) {
	if (
		typeof label === 'string' ||
		typeof label === 'boolean' ||
		typeof label === 'number'
	) {
		return label;
	}
	if (typeof label === 'object') {
		const { value, type } = label;
		if (typeof value === 'string' && type === VTL) {
			return label;
		}
	}
	if (typeof label === 'function') {
		return label;
	}

	return ``;
}

export default safetyLabel;
