import React, { useCallback } from 'react';
import LabelSelection from './label-selection';
import Input from './input';
import SelectionContainer from './selection-container';

function Selection({
	labelRenderer,
	placeholder,
	search,
	expended,
	disabled,
	focused,
	onChange,
	selectedIndex,
	options,
	editable,
	labelId,
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
			labelId={labelId}
			expanded={expended}
			ariaOwns={`${id}-list`}
		>
			<LabelSelection
				labelRenderer={labelRenderer}
				placeholder={placeholder}
				editable={editable}
				selectedIndex={selectedIndex}
				options={options}
				search={search}
				disabled={disabled}
				expended={expended}
			/>
			<Input
				id={`combobox-input-${id}`}
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
