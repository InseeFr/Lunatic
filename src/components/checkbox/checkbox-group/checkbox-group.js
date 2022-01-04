import React, { useCallback } from 'react';
import CheckboxOption from './checkbox-option';
import { Label, useOnHandleChange } from '../../commons';

function onClick() {}

function CheckBoxOptionWrapper({
	checkboxId,
	index,
	labelId,
	checked,
	value,
	onKeyDown,
	handleChange,
	response,
}) {
	const booleanValue = value || false;

	const onClickOption = useCallback(
		function (valueOption) {
			handleChange(response, !valueOption);
		},
		[handleChange, response]
	);

	return (
		<CheckboxOption
			id={checkboxId}
			labelledBy={labelId}
			index={index}
			checked={checked}
			onClick={onClickOption}
			value={booleanValue}
			onKeyDown={onKeyDown}
		/>
	);
}

function CheckboxGroup({ options, value, id, handleChange }) {
	return options.map(function (option, index) {
		const { label, response } = option;

		if (response) {
			const { name } = response;
			const optionValue = value[name];
			const checkboxId = `lunatic-checkbox-${id}-${name}`;
			const labelId = `lunatic-checkbox-label-${id}-${name}`;

			return (
				<div key={checkboxId} className="">
					<Label id={labelId} htmlFor={checkboxId}>
						{label}
					</Label>
					<CheckBoxOptionWrapper
						checkboxId={checkboxId}
						index={index}
						labelId={labelId}
						checked={optionValue}
						value={optionValue}
						onKeyDown={onClick}
						response={response}
						handleChange={handleChange}
					/>
				</div>
			);
		}
		return null;
	});
}

export default CheckboxGroup;
