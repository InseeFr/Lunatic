import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import data from './data';
import dataVTL from './data-vtl';
import dataForced from './data-forced';
import { positioningOptions, featuresOptions } from '../utils/options';
import { text, boolean, object, select } from '@storybook/addon-knobs/react';

const stories = storiesOf('CheckboxOne', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<CheckboxOne />" />;
	});

stories.addWithJSX('Default', () => <Orchestrator source={data} />);

stories.addWithJSX('Props', () => (
	<Orchestrator
		source={dataVTL}
		label={text('Label', '"I\'m the label of the CheckboxOne"')}
		positioning={select('Items positioning', positioningOptions, 'DEFAULT')}
		missing={boolean('Missing', false)}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		bindings={object('Bindings', { NAME: 'Poochie' })}
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
