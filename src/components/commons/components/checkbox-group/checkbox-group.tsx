import { type ReactNode } from 'react';
import { createCustomizableLunaticField, Errors, Fieldset } from '../../index';
import './checkbox-group.scss';
import type { LunaticError } from '../../../../use-lunatic/type';
import { type CheckboxGroupOption } from '../../../checkbox/checkbox-group/lunatic-checkbox-group';
import { CheckboxOption } from '../../../checkbox/commons';
import { getShortcutKey } from '../../../checkbox/commons/getShortcutKey';

type Props = {
	options: CheckboxGroupOption[];
	errors?: LunaticError[];
	id: string;
	type?: 'checkbox' | 'radio';
	label?: ReactNode;
	description?: ReactNode;
	shortcut?: boolean;
	// Handle arrow navigation (-1 = backward, 1 = forward)
	onArrowNavigation?: (direction: -1 | 1, index: number) => void;
};

function CheckboxGroupBase({
	options,
	id,
	label,
	description,
	errors,
	shortcut,
	type,
	onArrowNavigation,
}: Props) {
	const maxIndex = options.length;
	return (
		<Fieldset
			className="LunaticCheckboxGroup"
			legend={label}
			description={description}
		>
			{options.map((option, index) => (
				<CheckboxOption
					key={option.name}
					{...option}
					type={type}
					id={`lunatic-checkbox-${id}-${index}`}
					keyboardShortcut={
						shortcut ? getShortcutKey(index, maxIndex) : undefined
					}
					invalid={!!errors}
					onArrowNavigation={
						onArrowNavigation
							? (direction) => onArrowNavigation(direction, index)
							: undefined
					}
				/>
			))}
			<Errors errors={errors} />
		</Fieldset>
	);
}

export const CheckboxGroup = createCustomizableLunaticField(
	CheckboxGroupBase,
	'CheckboxGroup'
);
