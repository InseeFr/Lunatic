import React from 'react';
import useOptionsKeydown from './use-options-keydown';
import RadioOption from './radio-option';

function RadioGroup({ options, value, id, onClick }) {
	const onKeyDown = useOptionsKeydown(options, onClick);

	return options.map(function (option, index) {
		const { value: valueOption, label } = option;

		return (
			<RadioOption
				id={id}
				index={index}
				label={label}
				checked={value === valueOption}
				key={valueOption}
				onClick={onClick}
				value={valueOption}
				onKeyDown={onKeyDown}
			/>
		);
	});
}

export default RadioGroup;
