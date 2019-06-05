import React, { useState } from 'react';
import { selectCommonPropTypes } from './prop-types';
import classnames from 'classnames';
import SelectBase from '../shared/select-base.component';
import './simple-select.scss';

const SimpleSelect = ({
	className,
	children,
	name,
	readOnly,
	placeHolder,
	options,
	value: valueProps,
	handleChange,
	...rest
}) => {
	const [expanded, setExpanded] = useState(false);
	const [label, setLabel] = useState(null);
	const [initialValue, setInitialValue] = useState(
		valueProps ? valueProps : null
	);
	const [value, setValue] = useState(valueProps ? valueProps : null);

	if (valueProps !== initialValue) {
		setInitialValue(valueProps);
		setValue(valueProps);
		// handleChange(valueProps);
	}

	return (
		<SelectBase
			id="simple-select"
			options={children}
			expanded={expanded}
			readOnly={readOnly}
			value={value}
			initial={valueProps}
			placeHolder={placeHolder ? placeHolder : 'Veuillez ...'}
			setExpanded={ex => setExpanded(ex)}
			setValue={(val, label) => {
				setValue(val);
				setLabel(label);
				if (typeof handleChange === 'function') {
					handleChange(val);
				}
				return false;
			}}
			className={classnames('simple-select', { [className]: className })}
			{...rest}
		>
			<button
				aria-haspopup="listbox"
				className={classnames('bouton', { 'read-only': readOnly })}
				aria-expanded={expanded ? true : undefined}
				onClick={() => setExpanded(!expanded)}
				readOnly={readOnly ? true : undefined}
				name={name}
			>
				{label || placeHolder || 'Veuillez....'}
			</button>
		</SelectBase>
	);
};

SimpleSelect.propTypes = {
	...selectCommonPropTypes,
};

export default SimpleSelect;
