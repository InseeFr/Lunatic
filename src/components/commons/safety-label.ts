import { isElement } from '../../utils/is-element';
import { ReactNode } from 'react';

function safetyLabel(label: unknown): ReactNode {
	if (!label) {
		return '';
	}
	if (
		typeof label === 'string' ||
		typeof label === 'boolean' ||
		typeof label === 'number'
	) {
		return label;
	}
	if (typeof label === 'object') {
		if (isElement(label)) return label;
		if ('value' in label && typeof label.value === 'string') {
			return label.value;
		}
	}

	return ``;
}

export default safetyLabel;
