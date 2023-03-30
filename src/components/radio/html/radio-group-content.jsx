import React from 'react';
import { getShortcutKey } from '../../checkbox/commons/getShortcutKey';
import { useOptionsKeydown } from '../../commons';
import RadioOption from './radio-option';

function RadioGroupContent({
	options,
	value,
	id,
	onClick,
	checkboxStyle = false,
	shortcut,
}) {
	const onKeyDown = useOptionsKeydown(options, checkboxStyle, onClick);
	const maxIndex = options.length;
	return options.map(function (option, index) {
		const { value: valueOption, label, description } = option;
		const radioId = `lunatic-radio-${id}-${valueOption}`;
		const codeModality = getShortcutKey(index, maxIndex);
		return (
			<RadioOption
				key={radioId}
				id={radioId}
				index={index}
				maxIndex={maxIndex}
				checked={value === valueOption}
				currentValue={value}
				onClick={onClick}
				value={valueOption}
				onKeyDown={onKeyDown}
				checkboxStyle={checkboxStyle}
				label={label}
				description={description}
				codeModality={shortcut && codeModality}
				shortcut={shortcut}
			/>
		);
	});
}

export default RadioGroupContent;
