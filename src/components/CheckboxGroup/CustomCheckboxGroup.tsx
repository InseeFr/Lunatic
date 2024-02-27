import { type ReactNode } from 'react';
import type { LunaticError } from '../../use-lunatic/type';
import { type CheckboxGroupOption } from './CheckboxGroup';
import { customizedComponent } from '../shared/HOC/customizedComponent';
import { ComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import { Fieldset } from '../shared/Fieldset/Fieldset';
import { CheckboxOption } from '../shared/Checkbox/CheckboxOption';

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
	({ options, id, label, description, errors }: Props) => {
		return (
			<Fieldset
				className="lunatic-checkbox-group"
				legend={label}
				description={description}
			>
				{options.map((option) => {
					const checkboxId = `lunatic-checkbox-${id}-${option.name}`;
					return (
						<div className="lunatic-checkbox-group-option" key={checkboxId}>
							<CheckboxOption id={checkboxId} {...option} />
						</div>
					);
				})}
				<ComponentErrors errors={errors} />
			</Fieldset>
		);
	}
);
