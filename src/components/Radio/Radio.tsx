import type { LunaticComponentProps } from '../type';
import { getComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import { RadioGroup } from '../shared/Radio/RadioGroup';
import { customizedComponent } from '../shared/HOC/customizedComponent';

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
	} = props;
	return (
		<RadioGroup
			id={id}
			options={options}
			value={value}
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

export const Radio = customizedComponent('LunaticRadio', LunaticRadio);
