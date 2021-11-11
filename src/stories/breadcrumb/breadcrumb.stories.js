import React from 'react';
import { storiesOf } from '@storybook/react';
import { Breadcrumb } from 'components';
import { withReadme } from 'storybook-readme';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';

const elements = ['Sequence', 'Sub-sequence', 'Question'];

const stories = storiesOf('Breadcrumb', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Breadcrumb />" />;
	});

stories.addWithJSX('Default', () => (
	<div className="lunatic-component">
		<Breadcrumb id="default" elements={elements} />
	</div>
));
