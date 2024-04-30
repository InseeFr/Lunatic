import type { LunaticComponentProps } from '../type';
import { getComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import { RadioGroup } from '../shared/Radio/RadioGroup';
import { slottableComponent } from '../shared/HOC/slottableComponent';

function LunaticRadio(props: LunaticComponentProps<'Radio'>) {
	const {
		id,
		options,
		value,
		checkboxStyle,
		errors,
		handleChange,
		response,
		label,
		shortcut,
		className = 'lunatic-radio-group',
		disabled,
		readOnly,
		description,
	} = props;
	return (
		<RadioGroup
			id={id}
			options={options}
			value={value}
			description={description}
			onSelect={(v) => handleChange(response, v)}
			checkboxStyle={checkboxStyle}
			errors={getComponentErrors(errors, id)}
			label={label}
			className={className}
			shortcut={shortcut}
			disabled={disabled}
			readOnly={readOnly}
		/>
	);
}

export const Radio = slottableComponent('Radio', LunaticRadio);