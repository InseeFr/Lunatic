import { type ReactNode } from 'react';
import CheckboxGroupContent from './checkbox-group-content';
import {
	createCustomizableLunaticField,
	Errors,
	Fieldset,
} from '../../../commons';
import './checkbox-group.scss';
import type { LunaticError } from '../../../../use-lunatic/type';
import { type CheckboxGroupOption } from '../lunatic-checkbox-group';

type Props = {
	options: CheckboxGroupOption[];
	errors?: LunaticError[];
	id: string;
	label?: ReactNode;
	description?: ReactNode;
	shortcut?: boolean;
};

function CheckboxGroup({
	options,
	id,
	label,
	description,
	errors,
	shortcut,
}: Props) {
	return (
		<Fieldset
			className="lunatic-checkbox-group"
			legend={label}
			description={description}
		>
			<CheckboxGroupContent
				id={id}
				options={options}
				shortcut={shortcut}
				invalid={!!errors}
			/>
			<Errors errors={errors} />
		</Fieldset>
	);
}

export default createCustomizableLunaticField(CheckboxGroup, 'CheckboxGroup');
