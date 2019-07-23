import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { Breadcrumb } from 'components';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import { number, color, object } from '@storybook/addon-knobs/react';

const elements = ['Sequence', 'Sub-sequence', 'Question'];

const stories = storiesOf('Breadcrumb', module)
	.addDecorator(withReadme(readme))
	.addDecorator(Component => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Breadcrumb />" />;
	});

stories.addWithJSX('Props', () => <Breadcrumb elements={elements} />);

stories.addWithJSX('Styled', () => (
	<Breadcrumb
		id="styled"
		elements={elements}
		style={object('Generated style', {
			'background-color': color('Background color', '#e80a4d'),
			color: color('Color', 'white'),
			'border-radius': number('Border-radius', 0, {
				range: true,
				min: 0,
				max: 20,
				step: 1,
			}),
		})}
	/>
));
