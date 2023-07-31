import { ChangeEventHandler, useCallback } from 'react';
import { LabelSelection, LabelSelectionProps } from './label-selection';
import Input from './input';
import SelectionContainer from './selection-container';
import { LabelOrInput } from './LabelOrInput';

export type SelectionProps = {
	expanded?: boolean;
	focused?: boolean;
	onChange?: (s: string | null) => void;
	editable?: boolean;
	labelId?: string;
	id?: string;
} & LabelSelectionProps;

export function Selection({
	labelRenderer,
	placeholder,
	search,
	expanded,
	disabled,
	focused,
	onChange,
	selectedIndex,
	options,
	editable,
	labelId,
	id,
}: SelectionProps) {
	const onChangeEx = useCallback<ChangeEventHandler<HTMLInputElement>>(
		(e) => {
			onChange?.(e.target.value);
		},
		[onChange]
	);

	return (
		<SelectionContainer
			id={id}
			labelId={labelId}
			expanded={expanded}
			aria-owns={`${id}-list`}
		>
			<LabelOrInput
				labelRenderer={labelRenderer}
				placeholder={placeholder}
				selectedIndex={selectedIndex}
				options={options}
				search={search}
				disabled={disabled}
				onChange={onChangeEx}
				value={search}
				focused={focused}
				editable={editable}
				expanded={expanded}
			/>
		</SelectionContainer>
	);
}

/*
<LabelSelection
				labelRenderer={labelRenderer}
				placeholder={placeholder}
				selectedIndex={selectedIndex}
				options={options}
				search={search}
				disabled={disabled}
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
				expanded={expanded}
			/>

			*/
