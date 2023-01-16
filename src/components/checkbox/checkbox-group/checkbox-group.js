import React from 'react';
import PropTypes from 'prop-types';
import { createCustomizableLunaticField, Errors } from '../../commons';
import Fieldset from '../../commons/components/fieldset';
import CheckboxGroupContent from './checkbox-group-content';
import './checkbox.scss';

function CheckboxGroup({
	options,
	id,
	onChange,
	label,
	custom,
	description,
	errors,
}) {
	return (
		<Fieldset
			className="lunatic-checkbox-group-option"
			legend={label}
			custom={custom}
			description={description}
		>
			<CheckboxGroupContent id={id} onChange={onChange} options={options} />
			<Errors errors={errors} activeId={id} />
		</Fieldset>
	);
}

CheckboxGroup.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	errors: PropTypes.array,
	description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
				.isRequired,
			onClick: PropTypes.func.isRequired,
			name: PropTypes.string.isRequired,
			description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
			checked: PropTypes.bool,
		})
	),
};

CheckboxGroup.defaultProps = {
	options: [],
	label: undefined,
	errors: undefined,
	description: undefined,
};

export default createCustomizableLunaticField(CheckboxGroup, 'CheckboxGroup');
