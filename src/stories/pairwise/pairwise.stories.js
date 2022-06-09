import React from 'react';
import { storiesOf } from '@storybook/react';
import Orchestrator from '../utils/orchestrator';
import { titleDecorator } from '../utils';
import links from './links';
import block from './block';

const linkStories = storiesOf('Pairwise/Links', module).addDecorator(
	(Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="Pairwise links" />;
	}
);

linkStories.addWithJSX('Default', () => (
	<Orchestrator id="links" source={links} pagination />
));

const blockStories = storiesOf('Pairwise/Block', module).addDecorator(
	(Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="Pairwise block" />;
	}
);

blockStories.addWithJSX('Default', () => (
	<Orchestrator id="block" source={block} pagination />
));
