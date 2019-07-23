import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { ProgressBar } from 'components';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';

const stories = storiesOf('ProgressBar', module)
	.addDecorator(withReadme(readme))
	.addDecorator(Component => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<ProgressBar />" />;
	});

stories.addWithJSX('Default', () => (
	<React.Fragment>
		{Array.from(new Array(11), (a, i) => (
			<React.Fragment key={i}>
				<ProgressBar id={`default-${i * 10}`} value={i * 10} />
				<br />
			</React.Fragment>
		))}
	</React.Fragment>
));
