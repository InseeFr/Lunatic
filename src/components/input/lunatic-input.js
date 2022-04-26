import Input from './input';
import { createLunaticComponent } from '../commons';
import './input.scss';

const LunaticInput = createLunaticComponent(Input, {
	inputId: 'lunatic-input',
});

LunaticInput.defaultProps = {
	className: 'todo',
};

export default LunaticInput;
