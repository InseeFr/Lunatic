import React from 'react';
import { storiesOf } from '@storybook/react';
import Orchestrator from '../utils/orchestrator';
import simpleLoop from './simple-loop';
import simpsonsQuestion from './simpsons-question.json';
import simpsonsSequence from './simpsons-sequence.json';
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

const storiesSimpsons = storiesOf('Pagination/Simpsons', module).addDecorator(
	(Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Pagination />" />;
	}
);

storiesSimpsons.addWithJSX('Question', () => (
	<Orchestrator
		id="simple-loop"
		source={simpsonsQuestion}
		features={['VTL']}
		pagination
	/>
));

storiesSimpsons.addWithJSX('Sequence', () => (
	<Orchestrator
		id="simple-loop"
		source={simpsonsSequence}
		features={['VTL']}
		pagination
	/>
));
