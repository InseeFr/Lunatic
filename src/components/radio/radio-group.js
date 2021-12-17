import React from 'react';
import useOptionsKeydown from './use-options-keydown';
import RadioOption from './radio-option';
import { Label } from '../commons';

function RadioGroup({
	options,
	value,
	id,
	onClick,
	executeExpression,
	iteration,
	bindingDependencies,
}) {
	const onKeyDown = useOptionsKeydown(options, onClick);

	return options.map(function (option, index) {
		const { value: valueOption, label } = option;

		const radioId = `lunatic-radio-${id}-${valueOption}`;
		const labelId = `lunatic-radio-label-${id}-${valueOption}`;
		const labelCompute = executeExpression(label, {
			bindingDependencies,
			iteration,
		});

		return (
			<div key={radioId} className="">
				<Label id={labelId} htmlFor={radioId}>
					{labelCompute}
				</Label>
				<RadioOption
					id={radioId}
					labelledBy={labelId}
					index={index}
					label={labelCompute}
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
