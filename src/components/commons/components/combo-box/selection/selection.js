import React, { useCallback } from 'react';
import classnames from 'classnames';
import Label from './label';
import Input from './input';
import SelectionContainer from './selection-container';

// {getContent({ ...props, onChange: onChangeEx })}
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
	const {
		expended,
		id,
		onChange,
		labelRenderer,
		placeholder,
		search,
		htmlFor,
		disabled,
		focused,
		selectedIndex,
		options,
		editable,
		labelledBy,
	} = props;

	const onChangeEx = useCallback(
		function (e) {
			onChange(e.target.value);
		},
		[onChange]
	);
	const displayLabel = !editable || !expended;
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
				expended={expended}
				selectedIndex={selectedIndex}
				options={options}
				search={search}
				disabled={disabled}
				labelledBy={labelledBy}
				display={displayLabel}
				editable={editable}
			/>
			<Input
				id={htmlFor}
				className={classnames('lunatic-combo-box-input', {
					hidden: displayLabel,
				})}
				onChange={onChangeEx}
				value={search}
				placeholder={placeholder}
				disabled={disabled}
				focused={focused}
				display={editable}
			/>
		</SelectionContainer>
	);
}

export default Selection;
