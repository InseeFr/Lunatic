import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxOption } from '../commons';
import { createCustomizableLunaticField } from '../../commons';
import { Errors } from '../../commons';

function CheckboxBoolean({
	checked,
	id,
	disabled,
	onClick,
	label,
	errors,
	description,
}) {
	return (
		<div className="lunatic-checkbox-group-boolean">
			<CheckboxOption
				disabled={disabled}
				checked={checked}
				id={id}
				onClick={onClick}
				label={label}
				description={description}
			/>
			<Errors errors={errors} activeId={id} />
		</div>
	);
}

CheckboxBoolean.prototype = {
	id: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	checked: PropTypes.bool,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	errors: PropTypes.array,
	description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

CheckboxBoolean.defaultProps = {
	disabled: false,
	checked: undefined,
	label: undefined,
	errors: undefined,
	description: undefined,
};

export default createCustomizableLunaticField(
	CheckboxBoolean,
	'CheckboxBoolean'
);
