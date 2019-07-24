import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { TooltipResponse } from 'components';
import readme from './README.md';
import { titleDecorator } from 'utils/library';

const stories = storiesOf('TooltipResponse', module)
	.addDecorator(withReadme(readme))
	.addDecorator(Component => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<TooltipResponse />" />;
	});

stories.addWithJSX('Default', () => <TooltipResponse id="default" />);

stories.addWithJSX('Forced', () => (
	<TooltipResponse
		id="response"
		response={{
			name: 'response',
			valueState: [
				{ valueType: 'COLLECTED', value: 'Collected' },
				{ valueType: 'FORCED', value: 'Forced' },
				{ valueType: 'EDITED', value: '' },
			],
		}}
	/>
));

stories.addWithJSX('Edited', () => (
	<TooltipResponse
		id="response"
		response={{
			name: 'response',
			valueState: [
				{ valueType: 'COLLECTED', value: 'Collected' },
				{ valueType: 'FORCED', value: 'Forced' },
				{ valueType: 'EDITED', value: 'Edited' },
			],
		}}
	/>
));
