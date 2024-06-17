import Orchestrator from '../utils/orchestrator';
import source from './source';
import defaultArgTypes from '../utils/default-arg-types';

const stories = {
	title: 'Components/RemoteComponent',
	component: Orchestrator,
	argTypes: {
		...defaultArgTypes,
		shortcut: {
			table: { disable: false },
			control: 'boolean',
			defaultValue: true,
		},
	},
};

export default stories;

const Template = (args) => <Orchestrator {...args} />;
export const Default = Template.bind({});

Default.args = { id: 'radio', source, pagination: true };
