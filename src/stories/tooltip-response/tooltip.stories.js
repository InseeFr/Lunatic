import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { TooltipResponse } from 'components';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import mdLink from './md-link';
import mdTooltip from './md-tooltip.json';
import { positioningOptions, featuresOptions } from '../utils/options';
import { boolean, object, select } from '@storybook/addon-knobs/react';

const stories = storiesOf('Tooltip/Management', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Tooltip />" />;
	});

stories.addWithJSX('Forced', () => (
	<div style={{ marginLeft: '50%' }}>
		<TooltipResponse
			id="response"
			response={{
				name: 'response',
				values: {
					COLLECTED: 'Collected',
					FORCED: 'Forced',
					EDITED: null,
				},
			}}
		/>
	</div>
));

stories.addWithJSX('Edited', () => (
	<div style={{ marginLeft: '50%' }}>
		<TooltipResponse
			id="response"
			response={{
				name: 'response',
				values: {
					COLLECTED: 'Collected',
					FORCED: 'Forced',
					EDITED: 'Edited',
				},
			}}
		/>
	</div>
));

const storiesMD = storiesOf('Tooltip/Markdown', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="MD" />;
	});

storiesMD.addWithJSX('Link', () => (
	<Orchestrator
		id="link"
		source={mdLink}
		features={select('Features', featuresOptions, [])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		bindings={object('Bindings', { NAME: 'Mauro' })}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
	/>
));

storiesMD.addWithJSX('Tooltip', () => (
	<Orchestrator
		id="link"
		source={mdTooltip}
		features={select('Features', featuresOptions, [])}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		bindings={object('Bindings', { NAME: 'Mauro' })}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
	/>
));
