import React from 'react';
import PropTypes from 'prop-types';
import { createLunaticComponent, Errors } from '../commons';
import Textarea from './textarea';

const LunaticTextarea = ({ errors, ...props }) => (
	<>
		<Textarea {...props} />
		<Errors errors={errors} />
	</>
);

LunaticTextarea.defaultProps = {
	rows: 1,
	maxLength: 100,
	cols: 32,
	placeholder: 'Please enter your text here',
};

LunaticTextarea.propTypes = {
	rows: PropTypes.number,
	maxLength: PropTypes.number,
	cols: PropTypes.number,
	placeholder: PropTypes.string,
};

export default createLunaticComponent(LunaticTextarea, {
	inputId: 'lunatic-textarea',
});
