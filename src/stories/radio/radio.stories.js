import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import data from './data';
import dataVTL from './data-vtl';
import { positioningOptions, featuresOptions } from '../utils/options';
import { text, boolean, object, select } from '@storybook/addon-knobs/react';

const stories = storiesOf('Radio', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Radio />" />;
	});

stories.addWithJSX('Default', () => (
	<Orchestrator id="default" source={data} />
));

stories.addWithJSX('Props', () => (
	<Orchestrator
		id="props"
		source={dataVTL}
		label={text('Label', '"I\'m the label of the radio"')}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		bindings={object('Bindings', { CITY: 'Springfield' })}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
	/>
));
