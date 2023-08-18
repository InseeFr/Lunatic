import React from 'react';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../commons/use-on-handle-change';
import Dropdown from './html/dropdown';
import { LunaticComponentProps } from '../type';

const dropdownClassname = "lunatic-dropdown";
function LunaticDropdown({
	id,
	handleChange,
	options,
	writable,
	disabled,
	className,
	value,
	response,
	errors,
	label,
	preferences,
	declarations,
	missing,
	missingResponse,
	management,
	description,
}: LunaticComponentProps<'Dropdown'>) {
	const onChange = useOnHandleChange({ handleChange, response, value });
	const classNameConcat = className ? `${className} ${dropdownClassname}` : dropdownClassname;

	return (
		<LunaticComponent
			id={id}
			preferences={preferences}
			declarations={declarations}
			value={value}
			missing={missing}
			missingResponse={missingResponse}
			management={management}
			description={description}
			handleChange={handleChange}
		>
			<Dropdown
				id={id}
				writable={writable}
				disabled={disabled}
				options={options}
				onSelect={onChange}
				value={value}
				className={classNameConcat}
				errors={errors}
				label={label}
			/>
		</LunaticComponent>
	);
}

export default LunaticDropdown;
