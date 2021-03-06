import React from 'react';
import { storiesOf } from '@storybook/react';
import Orchestrator from '../utils/orchestrator';
import { withReadme } from 'storybook-readme';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import { featuresOptions } from '../utils/options';
import { text, boolean, select, object } from '@storybook/addon-knobs/react';

const stories = storiesOf('FilterDescription', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<FilterDescription />" />;
	});

const data = {
	components: [
		{
			id: 'j6p6my1d',
			componentType: 'FilterDescription',
			filterDescription: true,
			label: 'If you are not ready, please go to the end of the questionnaire',
		},
	],
};

stories.addWithJSX('Default', () => <Orchestrator source={data} />);

const dataProps = {
	components: [
		{
			id: 'j6p6my1d',
			componentType: 'FilterDescription',
			filterDescription: true,
			label:
				'"If you are not ready, please go to the end of the questionnaire: " || TITLE',
		},
	],
};

stories.addWithJSX('Props', () => (
	<Orchestrator
		source={dataProps}
		label={text(
			'Label',
			'"If you are not ready, please go to the end of the questionnaire: " || TITLE'
		)}
		filterDescription={boolean('Filter description', true)}
		features={select('Features', featuresOptions, ['VTL', 'MD'])}
		bindings={object('Bindings', { TITLE: 'Title' })}
	/>
));
