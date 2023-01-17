import React from 'react';
import PropTypes from 'prop-types';
import { createCustomizableLunaticField } from '../../commons';
import CheckboxGroupContent from './checkbox-group-content';
import { Errors, Fieldset } from '../../commons';
import './checkbox-group.scss';

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
			className="lunatic-checkbox-group"
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
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
				.isRequired,
			onClick: PropTypes.func.isRequired,
		})
	),
};

CheckboxGroup.defaultProps = { options: [] };

export default createCustomizableLunaticField(CheckboxGroup, 'CheckboxGroup');
