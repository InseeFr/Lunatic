import React from 'react';
import useOptionsKeydown from './use-options-keydown';
import RadioOption from './radio-option';
import { Label } from '../commons';

function RadioGroup({ options, value, id, onClick }) {
	const onKeyDown = useOptionsKeydown(options, onClick);

	return options.map(function (option, index) {
		const { value: valueOption, label } = option;

		const radioId = `lunatic-radio-${id}`;
		const labelId = `lunatic-radio-label-${id}`;

		return (
			<>
				<Label id={labelId} htmlFor={radioId}>
					{label}
				</Label>
				<RadioOption
					id={id}
					labelledBy={labelId}
					index={index}
					label={label}
					checked={value === valueOption}
					key={valueOption}
					onClick={onClick}
					value={valueOption}
					onKeyDown={onKeyDown}
				/>
			</>
		);
	});
}

export default RadioGroup;
