import React from 'react';
import PropTypes from 'prop-types';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../commons/use-on-handle-change';
import Dropdown from './dropdown';

function LunaticDropdown({
	id,
	handleChange,
	options,
	writable,
	disabled,
	value,
	response,
	errors,
	label,
	custom,
	preferences,
	declarations,
	missing,
	missingResponse,
	management,
	description,
}) {
	const onChange = useOnHandleChange({ handleChange, response, value });
	return (
		<LunaticComponent
			id={id}
			custom={custom}
			preferences={preferences}
			declarations={declarations}
			value={value}
			missing={missing}
			missingResponse={missingResponse}
			management={management}
			description={description}
		>
			<Dropdown
				id={id}
				writable={writable}
				disabled={disabled}
				options={options}
				editable={writable}
				onSelect={onChange}
				value={value}
				className="lunatic-dropdown"
				errors={errors}
				label={label}
			/>
		</LunaticComponent>
	);
}

LunaticDropdown.propTypes = {
	id: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.oneOfType([
				PropTypes.string.isRequired,
				PropTypes.elements,
			]),
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
				.isRequired,
		})
	).isRequired,
	disabled: PropTypes.bool,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.array,
	]),
};

LunaticDropdown.defaultProps = {
	disabled: false,
	value: null,
};

export default LunaticDropdown;
