import React, { useCallback, useState } from 'react';

import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useLunaticAutofocus } from '../../../use-lunatic/lunatic-context';

function InputNumberDefault({
	id,
	value,
	onChange,
	disabled,
	required,
	labelId,
	min,
	max,
	decimals,
}) {
	// Decimals is a number indicates the number behind the separator of decimals
	// Computing step attribute of input according to decimal number
	const [step] = useState(decimals ? 1 / Math.pow(10, decimals) : 1);

	const handleChange = useCallback(
		function (e) {
			const val = e.target.valueAsNumber;
			onChange(isNaN(val) ? null : val);
		},
		[onChange]
	);
	const { autofocusFn } = useLunaticAutofocus();
	return (
		<input
			id={id}
			ref={autofocusFn}
			className={classnames({ disabled })}
			type="number"
			inputMode={decimals ? 'decimal' : 'numeric'}
			onChange={handleChange}
			value={value ?? ''}
			labelledby={labelId}
			disabled={disabled}
			required={required}
			min={min}
			max={max}
			step={step}
			lang="en"
		/>
	);
}

InputNumberDefault.propTypes = {
	id: PropTypes.string.isRequired,
	labelId: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
		PropTypes.array,
	]),
	onChange: PropTypes.func.isRequired,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	min: PropTypes.number,
	max: PropTypes.number,
	decimals: PropTypes.number,
};

InputNumberDefault.defaultValue = {
	disabled: false,
	required: true,
	min: undefined,
	max: undefined,
	decimals: undefined,
	labelId: undefined,
};

export default InputNumberDefault;
