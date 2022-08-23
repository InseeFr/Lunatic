import Datepicker from './datepicker';
import { createLunaticComponent, Errors } from '../commons';
import './datepicker.scss';

const LunaticDatepicker = ({ errors, ...props }) => (
	<>
		<Datepicker {...props} />
		<Errors errors={errors} />
	</>
);

export default createLunaticComponent(LunaticDatepicker, {
	inputId: 'lunatic-datepicker',
});
