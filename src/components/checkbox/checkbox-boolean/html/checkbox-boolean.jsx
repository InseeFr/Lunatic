import PropTypes from 'prop-types';
import React from 'react';
import { createCustomizableLunaticField, Errors } from '../../../commons';
import { CheckboxOption } from '../../commons';

function CheckboxBoolean({
	checked,
	id,
	disabled,
	onClick,
	labelId,
	label,
	description,
	errors,
}) {
	return (
		<div className="lunatic-checkbox-boolean">
			<CheckboxOption
				disabled={disabled}
				checked={checked}
				id={id}
				onClick={onClick}
				labelledBy={labelId}
				value={checked}
				label={label}
				description={description}
				index={0}
			/>
			<Errors errors={errors} activeId={id} />
		</div>
	);
}

CheckboxBoolean.prototype = {
	id: PropTypes.string.isRequired,
	checked: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	errors: PropTypes.object,
	description: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
		PropTypes.array,
	]),
};

CheckboxBoolean.defaultProps = {
	checked: undefined,
	disabled: false,
	errors: undefined,
	description: undefined,
};

export default createCustomizableLunaticField(
	CheckboxBoolean,
	'CheckboxBoolean'
);
