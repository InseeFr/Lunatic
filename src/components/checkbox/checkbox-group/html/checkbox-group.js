import React from 'react';
import PropTypes from 'prop-types';
import CheckboxGroupContent from './checkbox-group-content';
import {
	createCustomizableLunaticField,
	Errors,
	Fieldset,
} from '../../../commons';
import './checkbox-group.scss';

function CheckboxGroup({ options, id, label, description, errors }) {
	return (
		<Fieldset
			className="lunatic-checkbox-group"
			legend={label}
			description={description}
		>
			<CheckboxGroupContent id={id} options={options} />
			<Errors errors={errors} activeId={id} />
		</Fieldset>
	);
}

CheckboxGroup.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
			description: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.element,
				PropTypes.array,
			]),
			value: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number,
				PropTypes.bool,
			]),
		})
	),
	id: PropTypes.string.isRequired,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	errors: PropTypes.object,
};

CheckboxGroup.defaultProps = {
	options: [],
	errors: undefined,
	label: undefined,
};

export default createCustomizableLunaticField(CheckboxGroup, 'CheckboxGroup');
