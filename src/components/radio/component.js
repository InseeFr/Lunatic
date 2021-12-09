import React, { useState, useCallback } from 'react';
import classnames from 'classnames';
import RadioChecked from '../../utils/icons/radio-checked.icon';
import RadioUnchecked from '../../utils/icons/radio-unchecked.icon';
import componentWrapper from '../component-wrapper';
import { ListDeclarationsWrapper } from '../declarations/wrappers';
import { areEqual } from '../../utils/lib';
import './radio.scss';

// const Radio = (props) => <ListDeclarationsWrapper type="radio" {...props} />;

// export default componentWrapper(React.memo(Radio, areEqual));

/*
 * Go out!
 *
 */
function FieldContainer({ children, management }) {
	return (
		<div className="field-container">
			<div
				className={classnames({
					'field-with-tooltip': management,
					field: !management,
				})}
			>
				{children}
			</div>
		</div>
	);
}

function Legend({ children }) {
	return <legend>{children}</legend>;
}

function getRadioIcon(state) {
	return state ? RadioChecked : RadioUnchecked;
}

function RadioOption({ label, checked, onClick, value }) {
	const Icon = getRadioIcon(checked);
	const onClickOption = useCallback(
		function () {
			onClick(value);
		},
		[value]
	);
	return (
		<div className="">
			<span
				role="radio"
				aria-checked={checked}
				tabIndex="0"
				onClick={onClickOption}
			>
				<Icon />
			</span>
			<label>{label}</label>
		</div>
	);
}

function RadioGroup({ options, value, onClick }) {
	return options.map(function (option) {
		const { value: valueOption, label } = option;

		return (
			<RadioOption
				label={label}
				checked={value === valueOption}
				key={valueOption}
				onClick={onClick}
				value={valueOption}
			/>
		);
	});
}

function Radio(props) {
	const { label, id, options, value, handleChange, response } = props;

	const onClick = useCallback(
		function (valueOption) {
			handleChange(response, valueOption);
		},
		[handleChange, response]
	);

	return (
		<FieldContainer>
			<Legend>{label}</Legend>
			<RadioGroup options={options} value={value} onClick={onClick} />
		</FieldContainer>
	);
}

export default React.memo(Radio);
