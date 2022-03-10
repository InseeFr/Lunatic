import React from 'react';
import RadioOption from './radio-option';
import { Label, useOptionsKeydown } from '../commons';

function RadioGroup({ options, value, id, onClick, checkboxStyle = false }) {
	const onKeyDown = useOptionsKeydown(options, onClick);

	return options.map(function (option, index) {
		const { value: valueOption, label } = option;
		const radioId = `lunatic-radio-${id}-${valueOption}`;
		const labelId = `lunatic-radio-label-${id}-${valueOption}`;

		return (
			<div key={radioId} className="lunatic-radio-group-option">
				<Label id={labelId} htmlFor={radioId}>
					{label}
				</Label>
				<RadioOption
					id={radioId}
					labelledBy={labelId}
					index={index}
					checked={value === valueOption}
					onClick={onClick}
					value={valueOption}
					onKeyDown={onKeyDown}
					checkboxStyle={checkboxStyle}
				/>
			</div>
		);
	});
}

export default RadioGroup;
