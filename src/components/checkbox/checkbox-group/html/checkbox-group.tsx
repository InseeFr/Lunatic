import React, { ReactNode } from 'react';
import CheckboxGroupContent from './checkbox-group-content';
import {
	createCustomizableLunaticField,
	Errors,
	Fieldset,
} from '../../../commons';
import './checkbox-group.scss';
import { LunaticError } from '../../../../use-lunatic/type';
import { CheckboxGroupOption } from '../lunatic-checkbox-group';
import { LunaticBaseProps } from '../../../type';

type Props = {
	options: CheckboxGroupOption[];
	errors?: Record<string, LunaticError[]>;
	id: string;
	label?: ReactNode;
	description?: LunaticBaseProps['description'];
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
			<CheckboxGroupContent id={id} options={options} shortcut={shortcut} />
			<Errors errors={errors} activeId={id} />
		</Fieldset>
	);
}

export default createCustomizableLunaticField(CheckboxGroup, 'CheckboxGroup');
