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
		handleChanges,
		response,
		label,
		shortcut,
		className = 'lunatic-radio-group',
		disabled,
		readOnly,
		description,
		declarations,
	} = props;
	return (
		<RadioGroup
			id={id}
			options={options}
			value={value}
			description={description}
			onSelect={(value) => handleChanges([{ name: response.name, value }])}
			checkboxStyle={checkboxStyle}
			errors={getComponentErrors(errors, id)}
			label={label}
			className={className}
			shortcut={shortcut}
			disabled={disabled}
			readOnly={readOnly}
			declarations={declarations}
		/>
	);
}

export const Radio = slottableComponent('Radio', LunaticRadio);
