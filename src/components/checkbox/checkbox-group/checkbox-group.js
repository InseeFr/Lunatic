import React from 'react';
import {
	createCustomizableLunaticField,
	useOnHandleChange,
} from '../../commons';
import { CheckboxOption } from '../commons';
import './checkbox.scss';

function onClick() {}

function CheckBoxOptionWrapper({
	checkboxId,
	labelId,
	checked,
	value,
	onKeyDown,
	handleChange,
	response,
	label,
}) {
	const booleanValue = value || false;

	const onClickOption = useOnHandleChange({
		handleChange,
		response,
		value: booleanValue,
	});

	// const onClickOption = useCallback(
	// 	function (valueOption) {
	// 		handleChange(response, !valueOption);
	// 	},
	// 	[handleChange, response]
	// );

	return (
		<CheckboxOption
			id={checkboxId}
			labelledBy={labelId}
			checked={checked}
			onClick={onClickOption}
			value={booleanValue}
			onKeyDown={onKeyDown}
			label={label}
		/>
	);
}

function CheckboxGroupContainer({ children }) {
	return <div className="lunatic-checkbox-group-option">{children}</div>;
}

function CheckboxGroup({ options, value, id, handleChange }) {
	return options.map(function (option) {
		const { label, response } = option;

		if (response && value) {
			const { name } = response;

			if (name in value) {
				const optionValue = value[name];
				const checkboxId = `lunatic-checkbox-${id}-${name}`;
				const labelId = `lunatic-checkbox-label-${id}-${name}`;

				return (
					<CheckboxGroupContainer key={checkboxId}>
						<CheckBoxOptionWrapper
							checkboxId={checkboxId}
							labelId={labelId}
							checked={optionValue}
							value={optionValue}
							onKeyDown={onClick}
							response={response}
							handleChange={handleChange}
							label={label}
						/>
					</CheckboxGroupContainer>
				);
			}
		}
		return null;
	});
}

export default createCustomizableLunaticField(CheckboxGroup, 'CheckboxGroup');
