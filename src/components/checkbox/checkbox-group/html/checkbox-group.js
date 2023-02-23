import './checkbox-group.scss';

import {
	Errors,
	Fieldset,
	createCustomizableLunaticField,
} from '../../../commons';

import CheckboxGroupContent from './checkbox-group-content';
import PropTypes from 'prop-types';
import React from 'react';

function CheckboxGroup({
	options,
	id,
	label,
	description,
	errors,
	shortcut,
	autofocus,
}) {
	return (
		<Fieldset
			className="lunatic-checkbox-group"
			legend={label}
			description={description}
		>
			<CheckboxGroupContent
				id={id}
				options={options}
				shortcut={shortcut}
				autofocus={autofocus}
			/>
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
	shortcut: PropTypes.bool,
	autofocus: PropTypes.bool,
};

CheckboxGroup.defaultProps = {
	options: [],
	errors: undefined,
	label: undefined,
	autofocus: false,
};

export default createCustomizableLunaticField(CheckboxGroup, 'CheckboxGroup');
