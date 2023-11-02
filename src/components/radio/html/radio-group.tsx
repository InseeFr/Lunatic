import {
	createCustomizableLunaticField,
	Errors,
	Fieldset,
} from '../../commons';
import './radio-group.scss';
import type { ReactNode } from 'react';
import type { LunaticError } from '../../../use-lunatic/type';
import { getShortcutKey } from '../../checkbox/commons/getShortcutKey';
import { CheckboxOption } from '../../checkbox/commons';

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

function RadioGroup({
	options,
	value,
	id,
	label,
	description,
	onSelect,
	errors,
	className,
	shortcut,
	disabled,
	readOnly,
}: RadioGroupProps) {
	const maxIndex = options.length;
	return (
		<Fieldset className={className} legend={label} description={description}>
			{options.map(function (option, index) {
				return (
					<CheckboxOption
						{...option}
						key={index}
						id={`lunatic-radio-${id}-${option.value}`}
						checked={value === option.value}
						onChange={(v) => onSelect(v ? option.value : null)}
						label={label}
						description={description}
						keyboardShortcut={
							shortcut ? getShortcutKey(index, maxIndex) : undefined
						}
						disabled={disabled}
						readOnly={readOnly}
						invalid={!!errors}
						type="radio"
					/>
				);
			})}
			<Errors errors={errors} />
		</Fieldset>
	);
}

export default createCustomizableLunaticField(RadioGroup, 'Radio');
