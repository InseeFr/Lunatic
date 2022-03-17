import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from '../utils';
import data from './data';
import dataProps from './data-props';
import dataForced from './data-forced';
import dataNAF from './data-naf';
import { labelPositionOptions, featuresOptions } from '../utils/options';
import {
	text,
	boolean,
	select,
	object,
	number,
} from '@storybook/addon-knobs/react';

const stories = storiesOf('Dropdown', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Dropdown />" />;
	});

stories.addWithJSX('Default', () => (
	<Orchestrator id="default" source={data} />
));

stories.addWithJSX('Props', () => (
	<Orchestrator
		id="props"
		source={dataProps}
		placeholderList={text('Placeholder', 'Placeholder')}
		missing={boolean('Missing', false)}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		bindings={object('Bindings', { NAME: 'Simpsons', TEXAS: 'Texas' })}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		writable={boolean('Writable', false)}
		widthAuto={boolean('Options auto width', false)}
		labelPosition={select('Label position', labelPositionOptions, 'DEFAULT')}
		mandatory={boolean('Mandatory', false)}
		management={boolean('Management', false)}
		zIndex={number('zIndex', 0)}
		freezeOptions={boolean('Freeze options', false)}
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

				<Orchestrator id="default" source={up ? dataForced : dataProps} />
			</>
		);
	};
	return <Fake />;
});

stories.addWithJSX('Naf', () => (
	<Orchestrator
		id="props"
		source={dataNAF}
		placeholderList={text('Placeholder', 'Placeholder')}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		bindings={object('Bindings', { NAME: 'Simpsons', TEXAS: 'Texas' })}
		disabled={boolean('Disabled', false)}
		focused={boolean('Focused', false)}
		writable={boolean('Writable', false)}
		labelPosition={select('Label position', labelPositionOptions, 'DEFAULT')}
		mandatory={boolean('Mandatory', false)}
		management={boolean('Management', false)}
		zIndex={number('zIndex', 0)}
		freezeOptions={boolean('Freeze options', true)}
	/>
));
