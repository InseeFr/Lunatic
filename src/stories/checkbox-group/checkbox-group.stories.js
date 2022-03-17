import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from '../utils';
import data from './data';
import dataVTL from './data-vtl';
import dataForced from './data-forced';
import { positioningOptions, featuresOptions } from '../utils/options';
import { text, boolean, object, select } from '@storybook/addon-knobs/react';

const stories = storiesOf('CheckboxGroup', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<CheckboxGroup />" />;
	});

stories.addWithJSX('Default', () => (
	<Orchestrator id="default" source={data} />
));

stories.addWithJSX('Props', () => (
	<Orchestrator
		id="props"
		source={dataVTL}
		label={text('Label', '"I\'m the label of the checkbox group"')}
		missing={boolean('Missing', false)}
		shortcut={boolean('Shortcut', false)}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		bindings={object('Bindings', { NAME: 'Mojo' })}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		management={boolean('Management', false)}
	/>
));

stories.addWithJSX('External update', () => {
	const Fake = () => {
		const [up, setUp] = useState(false);
		return (
			<>
				<button
					type="button"
					onClick={() => {
						setUp(true);
					}}
					disabled={up}
				>
					Force external update
				</button>

				<Orchestrator id="default" source={up ? dataForced : dataVTL} />
			</>
		);
	};
	return <Fake />;
});
