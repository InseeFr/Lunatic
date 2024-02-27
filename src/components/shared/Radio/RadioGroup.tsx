import './RadioGroup.scss';
import type { ReactNode } from 'react';
import { Fieldset } from '../Fieldset/Fieldset';
import { ComponentErrors } from '../ComponentErrors/ComponentErrors';
import { customizedComponent } from '../HOC/customizedComponent';
import { getShortcutKey } from '../Checkbox/getShortcutKey';
import { RadioOption } from './RadioOption';
import { useListKeyboardHandler } from '../../../hooks/useListKeyboardHandler';
import type { LunaticError } from '../../../use-lunatic/type';

export type RadioGroupProps = {
	options: { description?: ReactNode; label: ReactNode; value: string }[];
	id: string;
	value?: string | null;
	description?: ReactNode;
	label?: ReactNode;
	onSelect: (v: string | null) => void;
	checkboxStyle?: boolean;
	errors?: LunaticError[];
	className?: string;
	shortcut?: boolean;
	disabled?: boolean;
	readOnly?: boolean;
};

/**
 * Stack of radios fields surrounded by a fieldset
 */
function LunaticRadioGroup({
	options,
	value,
	id,
	label,
	description,
	onSelect,
	checkboxStyle = false,
	errors,
	className,
	shortcut,
	disabled,
	readOnly,
}: RadioGroupProps) {
	const onKeyDown = useListKeyboardHandler(options, onSelect);
	const maxIndex = options.length;
	return (
		<Fieldset className={className} legend={label} description={description}>
			{options.map(function (option, index) {
				const radioId = `lunatic-radio-${id}-${option.value}`;
				const codeModality = getShortcutKey(index, maxIndex);
				return (
					<RadioOption
						{...option}
						key={radioId}
						id={radioId}
						index={index}
						checked={value === option.value}
						onClick={onSelect}
						onKeyDown={onKeyDown}
						checkboxStyle={checkboxStyle}
						codeModality={shortcut ? codeModality : undefined}
						shortcut={shortcut}
						disabled={disabled}
						readOnly={readOnly}
						invalid={!!errors}
					/>
				);
			})}
			<ComponentErrors errors={errors} />
		</Fieldset>
	);
}

export const RadioGroup = customizedComponent('Radio', LunaticRadioGroup);
