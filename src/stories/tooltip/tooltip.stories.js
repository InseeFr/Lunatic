import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { Tooltip } from 'components';
import readme from './README.md';
import titleDecorator from 'utils/decorator/title-decorator';

const stories = storiesOf('Tooltip', module)
	.addDecorator(withReadme(readme))
	.addDecorator(Component => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Tooltip />" />;
	});

stories.addWithJSX('Default', () => <Tooltip id="default" />);

stories.addWithJSX('Forced', () => (
	<Tooltip
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
	<Tooltip
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
