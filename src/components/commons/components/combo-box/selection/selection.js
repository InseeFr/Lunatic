import React, { useCallback } from 'react';
import classnames from 'classnames';
import Label from './label';
import Input from './input';
import SelectionContainer from './selection-container';

function getContent({
	labelRenderer,
	placeholder,
	search,
	expended,
	id,
	disabled,
	focused,
	onChange,
	selectedIndex,
	options,
	editable,
}) {
	const displayLabel = !editable || !expended;
	if (displayLabel) {
		return (
			<Label
				labelRenderer={labelRenderer}
				placeholder={placeholder}
				expended={expended}
				selectedIndex={selectedIndex}
				options={options}
				search={search}
				disabled={disabled}
			/>
		);
	}
	return (
		<Input
			id={id}
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
	const { labelledBy, expended, id, disabled, focused, onChange } = props;

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
			labelledBy={labelledBy}
			expanded={expended}
			ariaOwns={`${id}-list`}
		>
			{getContent({ ...props, onChange: onChangeEx })}
		</SelectionContainer>
	);
}

export default Selection;
