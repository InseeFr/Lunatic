import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { Subsequence } from 'components';
import readme from './README.md';
import { titleDecorator } from '../utils';
import { featuresOptions } from '../utils/options';
import { text, object, select } from '@storybook/addon-knobs/react';

const stories = storiesOf('Subsequence', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Subsequence />" />;
	});

stories.addWithJSX('Default', () => (
	<div className="lunatic-component">
		<Subsequence id="default" label="Label of my subsequence" />
	</div>
));

stories.addWithJSX('Props', () => (
	<div className="lunatic-component">
		<Subsequence
			id="props"
			label={text('Label', '"Label of my subsequence: " || test')}
			features={select('Features', featuresOptions, ['VTL', 'MD'])}
			bindings={object('Bindings', { test: 'test' })}
		/>
	</div>
));
