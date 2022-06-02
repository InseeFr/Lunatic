import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from '../utils';
import declarations from './declarations';

const stories = storiesOf('Declarations', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Declarations />" />;
	});

stories.addWithJSX('Default', function () {
	return (
		<div className="lunatic-component">
			<Orchestrator
				id="default"
				source={declarations}
				features={['VTL', 'MD']}
			/>
		</div>
	);
});
