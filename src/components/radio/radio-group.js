import React from 'react';
import useOptionsKeydown from './use-options-keydown';
import RadioOption from './radio-option';
import { Label } from '../commons';

function RadioGroup({ options, value, id, onClick }) {
	const onKeyDown = useOptionsKeydown(options, onClick);

	return options.map(function (option, index) {
		const { value: valueOption, label } = option;
		const radioId = `lunatic-radio-${id}-${valueOption}`;
		const labelId = `lunatic-radio-label-${id}-${valueOption}`;

		return (
			<div key={radioId} className="">
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
				/>
			</div>
		);
	});
}

export default RadioGroup;
