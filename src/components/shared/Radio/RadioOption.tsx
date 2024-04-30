import { type ReactNode } from 'react';
import { slottableComponent } from '../HOC/slottableComponent';
import {
	CheckboxOption,
	LunaticCheckboxOption,
} from '../Checkbox/CheckboxOption';

export type Props = {
	id: string;
	value?: string | null;
	description?: ReactNode;
	onClick?: (v: string | null) => void;
	checkboxStyle?: boolean;
	shortcut?: boolean;
	checked?: boolean;
	disabled?: boolean;
	readOnly?: boolean;
	onKeyDown?: (v: { key: string; index: number }) => void;
	index?: number;
	labelledBy?: string;
	label?: ReactNode;
	codeModality?: string;
	invalid?: boolean;
};

function LunaticRadioOption(props: Props) {
	const onClick = () => {
		if (props.onClick) {
			props.checkboxStyle && props.checked
				? props.onClick(null)
				: props.onClick(props.value ?? null);
		}
	};

	return (
		<LunaticCheckboxOption
			{...props}
			onClick={onClick}
			className="lunatic-input-radio"
		/>
	);
}

export const RadioOption = slottableComponent(
	'RadioOption',
	LunaticRadioOption
);
