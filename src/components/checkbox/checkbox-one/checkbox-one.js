import React from 'react';
import PropTypes from 'prop-types';
import RadioGroup from '../../radio/radio-group';
import { createCustomizableLunaticField } from '../../commons';
import './checkbox-one.scss';

function CheckboxOne({
	options,
	value,
	id,
	label,
	description,
	onSelect,
	errors,
	custom,
}) {
	return (
		<RadioGroup
			id={id}
			className="lunatic-checkbox-one"
			options={options}
			value={value}
			custom={custom}
			errors={errors}
			label={label}
			description={description}
			onSelect={onSelect}
			checkboxStyle={true}
		/>
	);
}

CheckboxOne.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
			description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
			value: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number,
				PropTypes.bool,
			]),
		})
	),
	id: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	errors: PropTypes.array,
};

CheckboxOne.defaultProps = {
	options: [],
	errors: undefined,
	label: undefined,
};

export default createCustomizableLunaticField(CheckboxOne, 'CheckboxOne');
