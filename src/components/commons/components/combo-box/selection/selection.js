import React, { useCallback } from 'react';
import Label from './label';
import Input from './input';
import SelectionContainer from './selection-container';

function getContent({}) {
	const display = !editable || !expended;

	return <></>;
}

function Selection({
	labelRenderer,
	placeholder,
	search,
	expended,
	htmlFor,
	disabled,
	focused,
	onChange,
	selectedIndex,
	options,
	editable,
	labelledBy,
	id,
}) {
	const onChangeEx = useCallback(
		function (e) {
			onChange(e.target.value);
		},
		[onChange]
	);

	return (
		<SelectionContainer
			id={id}
			aria-controls={'todo'}
			expanded={expended}
			ariaOwns={`${id}-list`}
		>
			<Label
				id={htmlFor}
				labelRenderer={labelRenderer}
				placeholder={placeholder}
				editable={editable}
				selectedIndex={selectedIndex}
				options={options}
				search={search}
				disabled={disabled}
				labelledBy={labelledBy}
				expended={expended}
			/>

			<Input
				id={htmlFor}
				className="lunatic-combo-box-input"
				onChange={onChangeEx}
				value={search}
				placeholder={placeholder}
				disabled={disabled}
				focused={focused}
				editable={editable}
				expended={expended}
			/>
		</SelectionContainer>
	);
}

export default Selection;
