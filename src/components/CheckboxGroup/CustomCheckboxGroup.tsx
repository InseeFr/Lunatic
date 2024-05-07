import type { LunaticError } from '../../use-lunatic/type';
import { type CheckboxGroupOption } from './CheckboxGroup';
import { slottableComponent } from '../shared/HOC/slottableComponent';
import { ComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import { Fieldset } from '../shared/Fieldset/Fieldset';
import { CheckboxOption } from '../shared/Checkbox/CheckboxOption';
import { getShortcutKey } from '../shared/Checkbox/getShortcutKey';
import type { LunaticComponentProps } from '../type';
import { Declarations } from '../shared/Declarations/Declarations';

type Props = Pick<
	LunaticComponentProps<'CheckboxGroup'>,
	| 'id'
	| 'label'
	| 'description'
	| 'declarations'
	| 'shortcut'
	| 'readOnly'
	| 'disabled'
> & {
	options: CheckboxGroupOption[];
	errors?: LunaticError[];
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
		declarations,
	}: Props) => {
		return (
			<Fieldset
				className="lunatic-checkbox-group"
				legend={label}
				description={description}
			>
				<Declarations type="AFTER_QUESTION_TEXT" declarations={declarations} />
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
