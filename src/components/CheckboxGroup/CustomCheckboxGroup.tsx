import type { LunaticError } from '../../use-lunatic/type';
import { slottableComponent } from '../shared/HOC/slottableComponent';
import { ComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import { Fieldset } from '../shared/Fieldset/Fieldset';
import { CheckboxOption } from '../shared/Checkbox/CheckboxOption';
import { getShortcutKey } from '../shared/Checkbox/getShortcutKey';
import type { LunaticComponentProps } from '../type';
import { Declarations } from '../shared/Declarations/Declarations';
import { CustomInput } from '../Input/Input';

type Props = Pick<
	LunaticComponentProps<'CheckboxGroup'>,
	| 'id'
	| 'label'
	| 'description'
	| 'declarations'
	| 'shortcut'
	| 'readOnly'
	| 'disabled'
	| 'options'
	| 'orientation'
> & {
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
		orientation,
	}: Props) => {
		return (
			<Fieldset
				className="lunatic-checkbox-group"
				legend={label}
				description={description}
			>
				<Declarations type="AFTER_QUESTION_TEXT" declarations={declarations} />
				<div
					className={`lunatic-checkboxes lunatic-checkboxes--${orientation}`}
				>
					{options.map((option, index) => {
						return (
							<div className={`lunatic-checkbox-group-option`} key={option.id}>
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
								{option.onDetailChange && option.checked && (
									<CustomInput
										id="detailId"
										label={option.detailLabel ?? 'Précisez :'}
										value={
											typeof option.detailValue === 'string'
												? option.detailValue
												: ''
										}
										onChange={option.onDetailChange}
										disabled={disabled}
									/>
								)}
							</div>
						);
					})}
				</div>
				<ComponentErrors errors={errors} />
			</Fieldset>
		);
	}
);
