import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { Sequence } from 'components';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import { featuresOptions } from '../utils/options';
import { text, object, select } from '@storybook/addon-knobs/react';

const stories = storiesOf('Sequence', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Sequence />" />;
	});

stories.addWithJSX('Default', () => (
	<div className="lunatic-component">
		<Sequence id="default" label="Label of my sequence" />
	</div>
));

stories.addWithJSX('Props', () => (
	<div className="lunatic-component">
		<Sequence
			id="props"
			label={text('Label', '"Label of my sequence: " || TEST')}
			features={select('Features', featuresOptions, ['VTL', 'MD'])}
			bindings={object('Bindings', { TEST: 'test' })}
		/>
	</div>
));
