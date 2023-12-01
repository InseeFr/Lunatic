import { createCustomizableLunaticField, Errors } from '../../../commons';
import type { ReactNode } from 'react';
import type { LunaticError } from '../../../../use-lunatic/type';
import { CheckboxOption } from '../../commons';
import { voidFunction } from '../../../../utils/function';

type Props = {
	id: string;
	checked?: boolean;
	disabled?: boolean;
	onClick?: (b: boolean) => void;
	label?: ReactNode;
	description?: ReactNode;
	errors?: LunaticError[];
};

function CheckboxBoolean({
	checked,
	id,
	disabled,
	onClick,
	label,
	description,
	errors,
}: Props) {
	return (
		<div className="lunatic-checkbox-boolean">
			<CheckboxOption
				disabled={disabled}
				checked={checked}
				id={id}
				onChange={onClick}
				label={label}
				description={description}
				invalid={!!errors}
			/>
			<Errors errors={errors} />
		</div>
	);
}
export default createCustomizableLunaticField(
	CheckboxBoolean,
	'CheckboxBoolean'
);
