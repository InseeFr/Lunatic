import React from 'react';
import { storiesOf } from '@storybook/react';
import Orchestrator from '../utils/orchestrator';
import { titleDecorator } from '../utils';
import cleaning from './cleaning';

const stories = storiesOf('Behavior', module).addDecorator((Component) => {
	const WrappedComponent = titleDecorator(Component);
	return <WrappedComponent title="Cleaning behaviour" />;
});

stories.addWithJSX('Cleaning', () => (
	<Orchestrator id="cleaning" source={cleaning} pagination />
));

// ... resizing, missingBlock
