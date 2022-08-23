import Input from './input';
import { createLunaticComponent, Errors } from '../commons';
import './input.scss';

const LunaticInput = ({ errors, ...props }) => (
	<>
		<Input {...props} />
		<Errors errors={errors} />
	</>
);

LunaticInput.defaultProps = {
	className: 'todo',
};

export default createLunaticComponent(LunaticInput, {
	inputId: 'lunatic-input',
});
