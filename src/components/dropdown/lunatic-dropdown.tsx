import React from 'react';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../commons/use-on-handle-change';
import Dropdown from './html/dropdown';
import { LunaticComponentProps } from '../type';
import classNames from 'classnames';

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
	readOnly,
}: LunaticComponentProps<'Dropdown'>) {
	const onChange = useOnHandleChange({ handleChange, response, value });

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
				className={classNames(className, 'lunatic-dropdown')}
				errors={errors}
				label={label}
				readOnly={readOnly}
			/>
		</LunaticComponent>
	);
}

export default LunaticDropdown;
