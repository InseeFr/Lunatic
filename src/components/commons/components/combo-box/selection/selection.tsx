import { ChangeEventHandler, useCallback } from 'react';
import { LabelSelectionProps } from './label-selection';
import SelectionContainer from './selection-container';
import { LabelOrInput } from './LabelOrInput';

export type SelectionProps = {
	expanded?: boolean;
	focused?: boolean;
	onChange?: (s: string | null) => void;
	editable?: boolean;
	labelId?: string;
	id?: string;
	className?: string;
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
	className,
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
			className={className}
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
