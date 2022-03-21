import React, { useCallback } from 'react';
import { CheckboxOption } from '../commons';
import { Label } from '../../commons';
import { createCustomizableLunaticField } from '../../commons';

function onClick() {}

function CheckBoxOptionWrapper({
	checkboxId,

	labelId,
	checked,
	value,
	onKeyDown,
	handleChange,
	response,
}) {
	const booleanValue = value && false;

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
			checked={checked}
			onClick={onClickOption}
			value={booleanValue}
			onKeyDown={onKeyDown}
		/>
	);
}

function CheckboxGroupContainer({ children }) {
	return <div className="lunatic-checkbox-group-option">{children}</div>;
}

function CheckboxGroup({ options, value, id, handleChange }) {
	return options.map(function (option, index) {
		const { label, response } = option;

		if (response && value) {
			const { name } = response;

			if (name in value) {
				const optionValue = value[name];
				const checkboxId = `lunatic-checkbox-${id}-${name}`;
				const labelId = `lunatic-checkbox-label-${id}-${name}`;

				return (
					<CheckboxGroupContainer key={checkboxId}>
						<Label id={labelId} htmlFor={checkboxId}>
							{label}
						</Label>
						<CheckBoxOptionWrapper
							checkboxId={checkboxId}
							labelId={labelId}
							checked={optionValue}
							value={optionValue}
							onKeyDown={onClick}
							response={response}
							handleChange={handleChange}
						/>
					</CheckboxGroupContainer>
				);
			}
		}
		return null;
	});
}

export default createCustomizableLunaticField(CheckboxGroup);
