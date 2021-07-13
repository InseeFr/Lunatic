import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import data from './data';
import dataVTL from './data-vtl';
import { labelPositionOptions, featuresOptions } from '../utils/options';
import { text, boolean, object, select } from '@storybook/addon-knobs/react';
import { SuggesterLoaderWidget } from 'components';
import * as NAF from './naf-rev2';
import * as COG from './cog-communes';

// async function browseRestNAf() {
// 	const fetchNaf = await createFetchNafPaged();
// 	let currentCall = fetchNaf;
// 	while (currentCall) {
// 		const { next, entities } = await currentCall();
// 		console.log({ entities, next });
// 		currentCall = next;
// 	}
// }

// browseRestNAf();

/**
 *
 */
function getSuggesterInfo(name) {
	if (name === 'naf-rev2') {
		return { optionRenderer: NAF.OptionRenderer, idbVersion: '1' };
	} else if (name === 'cog-communes') {
		return { optionRenderer: COG.OptionRenderer, idbVersion: '1' };
	}
	console.warn(`Unknown store : ${name}`);
	return {};
}

function getWidgetLoaderInfo(name) {
	if (name === 'naf-rev2') {
		return {
			fetch: NAF.fetch,
			idbVersion: '1',
		};
	} else if (name === 'cog-communes') {
		return { fetch: COG.fetch, idbVersion: '1' };
	}
	console.warn(`Unknown store : ${name}`);
	return {};
}

const stories = storiesOf('Suggester', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Suggester />" />;
	});

stories.addWithJSX('Default', () => {
	const [message, setMessage] = useState(undefined);
	const onRefresh = useCallback(function (m) {
		setMessage(m);
	}, []);
	return (
		<>
			<SuggesterLoaderWidget
				source={data}
				getStoreInfo={getWidgetLoaderInfo}
				onRefresh={onRefresh}
			/>
			<Orchestrator
				id="default"
				source={data}
				getStoreInfo={getSuggesterInfo}
			/>
			<div>{message}</div>
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
