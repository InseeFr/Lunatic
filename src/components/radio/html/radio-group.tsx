import RadioGroupContent from './radio-group-content';
import {
	createCustomizableLunaticField,
	Errors,
	Fieldset,
} from '../../commons';
import './radio-group.scss';
import { ReactNode } from 'react';
import { LunaticError } from '../../../use-lunatic/type';

export type RadioGroupProps = {
	options: { description?: ReactNode; label: ReactNode; value: string }[];
	id: string;
	value?: string | null;
	description?: ReactNode;
	label?: ReactNode;
	onSelect: (v: string | null) => void;
	checkboxStyle?: boolean;
	errors?: Record<string, LunaticError[]>;
	className?: string;
	shortcut?: boolean;
	disabled?: boolean;
	readOnly?: boolean;
};

function RadioGroup({
	options,
	value,
	id,
	label,
	description,
	onSelect,
	checkboxStyle = false,
	errors,
	className,
	shortcut,
	disabled,
	readOnly,
}: RadioGroupProps) {
	return (
		<Fieldset className={className} legend={label} description={description}>
			<RadioGroupContent
				id={id}
				onClick={onSelect}
				value={value}
				checkboxStyle={checkboxStyle}
				options={options}
				shortcut={shortcut}
				disabled={disabled}
				readOnly={readOnly}
			/>
			<Errors errors={errors} activeId={id} />
		</Fieldset>
	);
}

export default createCustomizableLunaticField(RadioGroup, 'Radio');
