import { type ReactNode } from 'react';
import {
	createCustomizableLunaticField,
	Errors,
	Fieldset,
} from '../../../commons';
import './checkbox-group.scss';
import type { LunaticError } from '../../../../use-lunatic/type';
import { type CheckboxGroupOption } from '../lunatic-checkbox-group';
import { CheckboxOption } from '../../commons';
import { getShortcutKey } from '../../commons/getShortcutKey';

type Props = {
	options: CheckboxGroupOption[];
	errors?: LunaticError[];
	id: string;
	label?: ReactNode;
	description?: ReactNode;
	shortcut?: boolean;
};

function CheckboxGroup({
	options,
	id,
	label,
	description,
	errors,
	shortcut,
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
					id={`lunatic-checkbox-${id}-${option.name}`}
					keyboardShortcut={
						shortcut ? getShortcutKey(index, maxIndex) : undefined
					}
					invalid={!!errors}
				/>
			))}
			<Errors errors={errors} />
		</Fieldset>
	);
}

export default createCustomizableLunaticField(CheckboxGroup, 'CheckboxGroup');
