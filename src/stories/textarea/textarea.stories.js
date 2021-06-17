import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import data from './data';
import dataForced from './data-forced';
import { labelPositionOptions, featuresOptions } from '../utils/options';
import {
	text,
	boolean,
	number,
	object,
	select,
} from '@storybook/addon-knobs/react';

const stories = storiesOf('Textarea', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Textarea />" />;
	});

stories.addWithJSX('Default', () => (
	<Orchestrator id="default" source={data} />
));

stories.addWithJSX('Props', () => (
	<Orchestrator
		id="props"
		source={data}
		label={text('Label', '"Hello " || NAME')}
		placeholder={text('Placeholder', 'Placeholder')}
		rows={number('Rows', 5)}
		maxLength={number('Max length', 500)}
		readOnly={boolean('Read only', false)}
		mandatory={boolean('Mandatory', false)}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		bindings={object('Bindings', { NAME: 'Mauro' })}
		management={boolean('Management', false)}
		focused={boolean('Focused', false)}
		labelPosition={select('Label position', labelPositionOptions, 'DEFAULT')}
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

				<Orchestrator id="default" source={up ? dataForced : data} />
			</>
		);
	};
	return <Fake />;
});
