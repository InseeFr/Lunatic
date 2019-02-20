import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { Sequence } from 'components';
import readme from './README.md';
import titleDecorator from 'utils/decorator/title-decorator';
import { text, number, color, object } from '@storybook/addon-knobs/react';

const stories = storiesOf('Sequence', module)
	.addDecorator(withReadme(readme))
	.addDecorator(Component => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Sequence />" />;
	});

stories.addWithJSX('Default', () => (
	<Sequence id="default" label="Label of my sequence" />
));

stories.addWithJSX('Props', () => (
	<Sequence id="props" label={text('Label', 'Label of my sequence')} />
));

stories.addWithJSX('Styled', () => (
	<Sequence
		id="styled"
		label={text('Label', 'Label of my sequence')}
		style={object('Generated style', {
			color: color('Color', 'white'),
			'background-color': color('Background color', '#e80a4d'),
			'border-color': color('Border color', '#e80a4d'),
			'border-width': number('Border-width', 0, {
				range: true,
				min: 0,
				max: 20,
				step: 1,
			}),
			'border-radius': number('Border-radius', 0, {
				range: true,
				min: 0,
				max: 20,
				step: 1,
			}),
		})}
	/>
));
