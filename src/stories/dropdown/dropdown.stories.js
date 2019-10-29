import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import data from './data';
import { labelPositionOptions } from '../utils/options';
import { text, boolean, select } from '@storybook/addon-knobs/react';

const stories = storiesOf('Dropdown', module)
	.addDecorator(withReadme(readme))
	.addDecorator(Component => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Dropdown />" />;
	});

stories.addWithJSX('Default', () => (
	<Orchestrator id="default" source={data} />
));

stories.addWithJSX('Props', () => (
	<Orchestrator
		id="props"
		source={data}
		label={text('Label', "I'm the label of the dropdown")}
		placeholder={text('Placeholder', 'Placeholder')}
		readOnly={boolean('Read only', false)}
		writable={boolean('Writable', false)}
		labelPosition={select('Label position', labelPositionOptions, 'DEFAULT')}
		preferences={['COLLECTED', 'FORCED']}
		tooltip={boolean('Tooltip', false)}
	/>
));
