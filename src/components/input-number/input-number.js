import React from 'react';
import { createCustomizableLunaticField } from '../commons';
import InputNumberDefault from './input-number-default';
import InputNumberThousand from './input-number-thousand';
import './input-number.scss';

/**
 * We assume that we do not have the "arrow" buttons to increment a number when using the thousand separator (large number in principle).
 */
const InputNumber = (props) => {
	const { thousandSeparator, unit } = props;

	return (
		<div className="lunatic-input-number-container">
			{thousandSeparator && <InputNumberThousand {...props} />}
			{!thousandSeparator && <InputNumberDefault {...props} />}
			{unit && <span>{unit}</span>}
		</div>
	);
};

export default createCustomizableLunaticField(InputNumber, 'InputNumber');
