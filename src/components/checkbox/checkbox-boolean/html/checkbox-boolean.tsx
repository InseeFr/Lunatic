import { createCustomizableLunaticField, Errors } from '../../../commons';
import { ReactNode } from 'react';
import { LunaticError } from '../../../../use-lunatic/type';
import { CheckboxOption } from '../../commons';
import { voidFunction } from '../../../../utils/function';

type Props = {
	id: string;
	checked?: boolean;
	disabled?: boolean;
	onClick?: (b: boolean) => void;
	label?: ReactNode;
	description?: ReactNode;
	errors?: Record<string, LunaticError[]>;
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
				onClick={onClick ?? voidFunction}
				label={label}
				description={description}
			/>
			<Errors errors={errors} activeId={id} />
		</div>
	);
}
export default createCustomizableLunaticField(
	CheckboxBoolean,
	'CheckboxBoolean'
);
