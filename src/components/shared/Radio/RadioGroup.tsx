import { Fieldset } from '../Fieldset/Fieldset';
import { ComponentErrors } from '../ComponentErrors/ComponentErrors';
import { slottableComponent } from '../HOC/slottableComponent';
import { getShortcutKey } from '../Checkbox/getShortcutKey';
import { RadioOption } from './RadioOption';
import { useListKeyboardHandler } from '../../../hooks/useListKeyboardHandler';
import type { LunaticError } from '../../../use-lunatic/type';
import { Declarations } from '../Declarations/Declarations';
import type { LunaticComponentProps } from '../../type';

export type RadioGroupProps = Pick<
	LunaticComponentProps<'Radio'>,
	| 'id'
	| 'options'
	| 'value'
	| 'checkboxStyle'
	| 'label'
	| 'shortcut'
	| 'className'
	| 'disabled'
	| 'readOnly'
	| 'description'
	| 'declarations'
> & {
	errors?: LunaticError[];
	clearable?: boolean;
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
	checkboxStyle = false,
	errors,
	className,
	shortcut,
	disabled,
	readOnly,
	declarations,
}: RadioGroupProps) {
	const onKeyDown = useListKeyboardHandler(options);
	const maxIndex = options.length;
	return (
		<Fieldset className={className} legend={label} description={description}>
			<Declarations type="AFTER_QUESTION_TEXT" declarations={declarations} />
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

export const RadioGroup = slottableComponent('RadioGroup', LunaticRadioGroup);
