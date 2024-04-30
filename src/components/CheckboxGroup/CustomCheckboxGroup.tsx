import { type ReactNode } from 'react';
import type { LunaticError } from '../../use-lunatic/type';
import { type CheckboxGroupOption } from './CheckboxGroup';
import { slottableComponent } from '../shared/HOC/slottableComponent';
import { ComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import { Fieldset } from '../shared/Fieldset/Fieldset';
import { CheckboxOption } from '../shared/Checkbox/CheckboxOption';
import { getShortcutKey } from '../shared/Checkbox/getShortcutKey';

type Props = {
	options: CheckboxGroupOption[];
	errors?: LunaticError[];
	id: string;
	label?: ReactNode;
	description?: ReactNode;
	shortcut?: boolean;
	readOnly?: boolean;
	disabled?: boolean;
};

export const CustomCheckboxGroup = slottableComponent<Props>(
	'CheckboxGroup',
	({
		options,
		label,
		description,
		errors,
		shortcut,
		disabled,
		readOnly,
	}: Props) => {
		console.log({ shortcut });
		return (
			<Fieldset
				className="lunatic-checkbox-group"
				legend={label}
				description={description}
			>
				{options.map((option, index) => {
					return (
						<div className="lunatic-checkbox-group-option" key={option.id}>
							<CheckboxOption
								{...option}
								disabled={disabled}
								readOnly={readOnly}
								shortcut={shortcut}
								invalid={!!errors}
								id={option.id}
								codeModality={
									shortcut ? getShortcutKey(index, options.length) : undefined
								}
							/>
						</div>
					);
				})}
				<ComponentErrors errors={errors} />
			</Fieldset>
		);
	}
);
