import React, { useCallback } from 'react';
import { CheckboxOption } from '../commons';
import './checkbox.scss';

function CheckBoxOptionWrapper({
	checkboxId,
	labelId,
	checked,
	onKeyDown,
	onClick,
	label,
}) {
	const onClickOption = useCallback(
		function () {
			if (typeof onClick === 'function') {
				onClick(checked === undefined ? false : checked);
			}
		},
		[onClick, checked]
	);

	return (
		<CheckboxOption
			id={checkboxId}
			labelledBy={labelId}
			checked={checked}
			onClick={onClickOption}
			onKeyDown={onKeyDown}
			label={label}
		/>
	);
}

function CheckboxGroupContainer({ children }) {
	return <div className="lunatic-checkbox-group-option">{children}</div>;
}

function CheckboxGroupContent({ options, id }) {
	return options.map(function (option) {
		const { label, checked, name, onClick, description } = option;
		const checkboxId = `lunatic-checkbox-${id}-${name}`;

		return (
			<CheckboxGroupContainer key={checkboxId}>
				<CheckboxOption
					id={checkboxId}
					checked={checked}
					onClick={onClick}
					label={label}
					description={description}
				/>
			</CheckboxGroupContainer>
		);
	});
}

export default CheckboxGroupContent;
