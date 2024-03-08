import type { LunaticComponentProps } from '../type';
import { getComponentErrors } from '../shared/ComponentErrors/ComponentErrors';
import { slottableComponent } from '../shared/HOC/slottableComponent';
import { SimpleOptionRenderer } from './renderer/SimpleOptionRenderer';
import { SimpleLabelRenderer } from './renderer/SimpleLabelRenderer';
import { Combobox } from '../shared/Combobox/Combobox';
import classNames from 'classnames';
import type { LunaticError } from '../../use-lunatic/type';

export function Dropdown({
	handleChange,
	response,
	errors,
	...props
}: LunaticComponentProps<'Dropdown'>) {
	return (
		<CustomDropdown
			{...props}
			onChange={(v) => handleChange(response, v)}
			errors={getComponentErrors(errors, props.id)}
		/>
	);
}

type CustomProps = Omit<
	LunaticComponentProps<'Dropdown'>,
	'response' | 'handleChange' | 'errors'
> & {
	onChange: (v: string | null) => void;
	errors?: LunaticError[];
};

export const CustomDropdown = slottableComponent<CustomProps>(
	'Dropdown',
	(props) => {
		const {
			id,
			disabled,
			options,
			className,
			value,
			description,
			label,
			errors,
			onChange,
			readOnly,
		} = props;

		return (
			<Combobox
				id={id}
				className={classNames(className, 'lunatic-dropdown')}
				disabled={disabled}
				readOnly={readOnly}
				options={options}
				editable={false}
				onSelect={onChange}
				optionRenderer={SimpleOptionRenderer}
				labelRenderer={SimpleLabelRenderer}
				value={value}
				label={label}
				errors={errors}
				description={description}
			/>
		);
	}
);
