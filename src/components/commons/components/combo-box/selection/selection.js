import React, { useCallback } from 'react';
import Label from './label';
import Input from './input';
import SelectionContainer from './selection-container';

function getContent({
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
}) {
	const displayLabel = !editable || !expended;

	if (displayLabel) {
		return (
			<Label
				id={htmlFor}
				labelRenderer={labelRenderer}
				placeholder={placeholder}
				expended={expended}
				selectedIndex={selectedIndex}
				options={options}
				search={search}
				disabled={disabled}
				labelledBy={labelledBy}
			/>
		);
	}
	return (
		<Input
			id={htmlFor}
			className="lunatic-combo-box-input"
			onChange={onChange}
			value={search}
			placeholder={placeholder}
			disabled={disabled}
			focused={focused}
		/>
	);
}

function Selection(props) {
	const { expended, id, onChange } = props;
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
			{getContent({ ...props, onChange: onChangeEx })}
		</SelectionContainer>
	);
}

export default Selection;
