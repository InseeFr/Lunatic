import { isValidElement } from 'react';

function getLabel(label) {
	if (isValidElement(label)) {
		const { props } = label;
		const { expression } = props;
		return `${expression}`;
	}

	return `${label}`;
}

export default getLabel;
