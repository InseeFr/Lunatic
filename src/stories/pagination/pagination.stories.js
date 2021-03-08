import React from 'react';
import { storiesOf } from '@storybook/react';
import Orchestrator from '../utils/orchestrator';
import simpleLoop from './simple-loop';
import { titleDecorator } from 'utils/lib';

const stories = storiesOf('Pagination', module).addDecorator((Component) => {
	const WrappedComponent = titleDecorator(Component);
	return <WrappedComponent title="<Pagination />" />;
});

stories.addWithJSX('SimpleLoop', () => (
	<Orchestrator
		id="simple-loop"
		source={simpleLoop}
		features={['VTL']}
		pagination
	/>
));
