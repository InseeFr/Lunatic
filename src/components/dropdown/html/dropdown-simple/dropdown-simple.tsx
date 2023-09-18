import { ComboBox } from '../../../commons';
import SimpleOptionRenderer from './simple-option-renderer';
import SimpleLabelRenderer from './simple-label-renderer';
import { type DropdownProps } from '../dropdown';

function DropdownSimple({
	id,
	disabled,
	options,
	onSelect,
	className,
	value,
	label,
	errors,
	description,
	readOnly,
}: DropdownProps) {
	return (
		<ComboBox
			id={id}
			className={className}
			disabled={disabled}
			readOnly={readOnly}
			options={options}
			editable={false}
			onSelect={onSelect}
			optionRenderer={SimpleOptionRenderer}
			labelRenderer={SimpleLabelRenderer}
			value={value}
			label={label}
			errors={errors}
			description={description}
		/>
	);
}

export default DropdownSimple;
