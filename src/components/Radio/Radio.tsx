import type { LunaticComponentProps } from '../type';
import { getComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import { RadioGroup } from '../shared/Radio/RadioGroup';
import { slottableComponent } from '../shared/HOC/slottableComponent';
import { useLunaticComponentsOptions } from '../../use-lunatic/lunatic-context';

function LunaticRadio(props: LunaticComponentProps<'Radio'>) {
	const {
		id,
		options,
		value,
		checkboxStyle,
		errors,
		label,
		shortcut,
		className = 'lunatic-radio-group',
		disabled,
		readOnly,
		description,
		declarations,
		orientation,
	} = props;
	const { detailAlwaysDisplayed } = useLunaticComponentsOptions();
	return (
		<RadioGroup
			id={id}
			options={options}
			value={value}
			description={description}
			checkboxStyle={checkboxStyle}
			errors={getComponentErrors(errors, id)}
			label={label}
			className={className}
			shortcut={shortcut}
			disabled={disabled}
			readOnly={readOnly}
			declarations={declarations}
			orientation={orientation ?? 'vertical'}
			detailAlwaysDisplayed={detailAlwaysDisplayed}
		/>
	);
}

export const Radio = slottableComponent('Radio', LunaticRadio);
