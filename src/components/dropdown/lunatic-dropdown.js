import React from 'react';
import PropTypes from 'prop-types';
import { createLunaticComponent, Errors } from '../commons';
import Dropdown from './dropdown';

function LunaticDropdown({
	id,
	onChange,
	options,
	writable,
	disabled,
	htmlFor,
	labelId,
	value,
	errors,
}) {
	return (
		<>
			<Dropdown
				id={id}
				htmlFor={id}
				labelId={labelId}
				writable={writable}
				disabled={disabled}
				options={options}
				editable={writable}
				onSelect={onChange}
				value={value}
				className="lunatic-dropdown"
			/>
			<Errors errors={errors} />
		</>
	);
}

LunaticDropdown.propTypes = {
	id: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
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

export default createLunaticComponent(LunaticDropdown);
