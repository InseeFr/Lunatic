import PropTypes from 'prop-types';
import { createLunaticComponent } from '../commons';
import Textarea from './textarea';

const LunaticTextarea = createLunaticComponent(Textarea, {
	inputId: 'lunatic-textarea',
});

Textarea.defaultProps = {
	rows: 1,
	maxLength: 100,
	cols: 32,
	placeholder: 'Please enter your text here',
};

Textarea.propTypes = {
	rows: PropTypes.number,
	maxLength: PropTypes.number,
	cols: PropTypes.number,
	placeholder: PropTypes.string,
};

export default LunaticTextarea;
