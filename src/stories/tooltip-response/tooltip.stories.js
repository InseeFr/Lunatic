import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { TooltipResponse } from 'components';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';

const stories = storiesOf('TooltipResponse', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<TooltipResponse />" />;
	});

stories.addWithJSX('Default', () => <TooltipResponse id="default" />);

stories.addWithJSX('Forced', () => (
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
));

stories.addWithJSX('Edited', () => (
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
));
