import React from 'react';
import RadioOption from './radio-option';
import { useOptionsKeydown } from '../../commons';

function RadioGroupContent({
	options,
	value,
	id,
	onClick,
	checkboxStyle = false,
	custom,
}) {
	const onKeyDown = useOptionsKeydown(options, onClick);
	return options.map(function (option, index) {
		const { value: valueOption, label, description } = option;
		const radioId = `lunatic-radio-${id}-${valueOption}`;

		return (
			<RadioOption
				key={radioId}
				id={radioId}
				index={index}
				checked={value === valueOption}
				onClick={onClick}
				value={valueOption}
				onKeyDown={onKeyDown}
				checkboxStyle={checkboxStyle}
				label={label}
				description={description}
				custom={custom}
			/>
		);
	});
}

export default RadioGroupContent;
