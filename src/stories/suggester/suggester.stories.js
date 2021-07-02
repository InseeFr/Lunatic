import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import data from './data';
import dataVTL from './data-vtl';
import { labelPositionOptions, featuresOptions } from '../utils/options';
import { text, boolean, object, select } from '@storybook/addon-knobs/react';
import SuggesterLoaderWidget from './suggester-loader-widget';
import { getSuggesterNafInfo, getWidgetLoaderNafInfo } from './naf-rev2';

/**
 *
 */
function getSuggesterInfo(name) {
	if (name === 'naf-rev2') {
		return getSuggesterNafInfo();
	}
	console.warn(`Unknow store : ${name}`);
	return {};
}

function getWidgetLoaderInfo(name) {
	if (name === 'naf-rev2') {
		return getWidgetLoaderNafInfo();
	}
	console.warn(`Unknow store : ${name}`);
	return {};
}

const stories = storiesOf('Suggester', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Suggester />" />;
	});

// TODO: Load into indexdb, path 'data/cities', with the following shape:
// [{value: "70285", label: "Héricourt"}]

stories.addWithJSX('Default', () => {
	return (
		<>
			<SuggesterLoaderWidget source={data} getStoreInfo={getWidgetLoaderInfo} />
			<Orchestrator
				id="default"
				source={data}
				getStoreInfo={getSuggesterInfo}
			/>
		</>
	);
});

stories.addWithJSX('Props', () => {
	return (
		<>
			<SuggesterLoaderWidget source={data} getStoreInfo={getWidgetLoaderInfo} />
			<Orchestrator
				id="props"
				source={dataVTL}
				label={text('Label', '"Enjoy the suggester below"')}
				features={select('Features', featuresOptions, ['VTL', 'MD'])}
				bindings={object('Bindings', {})}
				disabled={boolean('Disabled', false)}
				focused={boolean('Focused', false)}
				management={boolean('Management', false)}
				labelPosition={select(
					'Label position',
					labelPositionOptions,
					'DEFAULT'
				)}
				getStoreInfo={getSuggesterInfo}
			/>
		</>
	);
});
