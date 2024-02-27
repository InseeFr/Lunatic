import { type ReactNode } from 'react';
import type { LunaticError } from '../../use-lunatic/type';
import { type CheckboxGroupOption } from './CheckboxGroup';
import { customizedComponent } from '../shared/HOC/customizedComponent';
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
};

export const CustomCheckboxGroup = customizedComponent<Props>(
	'CheckboxGroup',
	({ options, id, label, description, errors, shortcut }: Props) => {
		return (
			<Fieldset
				className="lunatic-checkbox-group"
				legend={label}
				description={description}
			>
				{options.map((option, index) => {
					const checkboxId = `lunatic-checkbox-${id}-${option.name}`;
					return (
						<div className="lunatic-checkbox-group-option" key={checkboxId}>
							<CheckboxOption
								{...option}
								shortcut={shortcut}
								invalid={!!errors}
								id={checkboxId}
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
