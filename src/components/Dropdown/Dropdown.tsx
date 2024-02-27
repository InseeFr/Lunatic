import './Dropdown.scss';
import type { LunaticComponentProps } from '../type';
import { getComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import { customizedComponent } from '../shared/HOC/customizedComponent';
import { SimpleOptionRenderer } from './renderer/SimpleOptionRenderer';
import { SimpleLabelRenderer } from './renderer/SimpleLabelRenderer';
import { DropdownWritable } from './DropdownWritable';
import { Combobox } from '../shared/Combobox/Combobox';
import classNames from 'classnames';

function LunaticDropdown({
	id,
	disabled,
	options,
	writable,
	className,
	value,
	description,
	label,
	errors,
	readOnly,
	response,
	handleChange,
}: LunaticComponentProps<'Dropdown'>) {
	const onSelect = (v: string | null) => handleChange(response, v);
	if (writable) {
		return (
			<DropdownWritable
				id={id}
				className={classNames(className, 'lunatic-dropdown')}
				disabled={disabled}
				readOnly={readOnly}
				options={options}
				onSelect={onSelect}
				value={value}
				label={label}
				errors={getComponentErrors(errors, id)}
				description={description}
			/>
		);
	}

	return (
		<Combobox
			id={id}
			className={classNames(className, 'lunatic-dropdown')}
			disabled={disabled}
			readOnly={readOnly}
			options={options}
			editable={false}
			onSelect={onSelect}
			optionRenderer={SimpleOptionRenderer}
			labelRenderer={SimpleLabelRenderer}
			value={value}
			label={label}
			errors={getComponentErrors(errors, id)}
			description={description}
		/>
	);
}

export const Dropdown = customizedComponent('Dropdown', LunaticDropdown);
