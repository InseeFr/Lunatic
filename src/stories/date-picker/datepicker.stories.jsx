import { action } from '@storybook/addon-actions';
import { Datepicker } from '../../components/Datepicker/Datepicker';

export default {
	title: 'Components/Datepicker',
	component: Datepicker,
	args: {
		value: '1920-02-01',
		dateFormat: 'YYYY-MM-DD',
		handleChange: action('handleChange'),
		response: { name: 'date' },
	},
	parameters: {
		controls: { include: ['dateFormat', 'readOnly', 'disabled'] },
	},
	argTypes: {
		dateFormat: {
			control: 'radio',
			options: ['YYYY-MM-DD', 'YYYY-MM', 'YYYY'],
		},
		readOnly: { control: 'boolean' },
		disabled: { control: 'boolean' },
	},
};

export const Basic = {};
