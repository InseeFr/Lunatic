import React from 'react';
import RadioOption from './radio-option';
import { useOptionsKeydown, createCustomizableLunaticField } from '../commons';
import { getShortcutKey } from '../checkbox/commons/getShortcutKey';

function Radio({
	options,
	value,
	id,
	onClick,
	shortcut,
	checkboxStyle = false,
	disabled = false,
}) {
	const onKeyDown = useOptionsKeydown(options, onClick);
	const maxIndex = options.length;
	return options.map(function (option, index) {
		const { value: valueOption, label } = option;
		const radioId = `lunatic-radio-${id}-${valueOption}`;
		const labelId = `lunatic-radio-label-${id}-${valueOption}`;
		const codeModality = getShortcutKey(index, maxIndex);

		return (
			<div key={radioId} className="lunatic-radio-group-option">
				<RadioOption
					id={radioId}
					labelledBy={labelId}
					index={index}
					checked={value === valueOption}
					onClick={onClick}
					value={valueOption}
					onKeyDown={onKeyDown}
					checkboxStyle={checkboxStyle}
					label={label}
					shortcut={shortcut}
					codeModality={codeModality}
					disabled={disabled}
				/>
			</div>
		);
	});
}

export default createCustomizableLunaticField(Radio, 'Radio');
