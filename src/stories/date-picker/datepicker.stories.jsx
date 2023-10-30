import LunaticDatepicker from '../../components/datepicker';
import { action } from '@storybook/addon-actions';

export default {
	title: 'Components/Datepicker',
	component: LunaticDatepicker,
	args: {
		value: '1920-02-01',
		format: 'YYYY-MM-DD',
		handleChange: action('handleChange'),
		response: { name: 'date' },
	},
	parameters: {
		controls: { include: ['format', 'readOnly', 'disabled'] },
	},
	argTypes: {
		format: { control: 'radio', options: ['YYYY-MM-DD', 'YYYY-MM', 'YYYY'] },
		readOnly: { control: 'boolean' },
		disabled: { control: 'boolean' },
	},
};

export const Basic = {};
