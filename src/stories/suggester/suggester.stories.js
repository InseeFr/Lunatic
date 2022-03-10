import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import Orchestrator from '../utils/orchestrator';
import readme from './README.md';
import { titleDecorator } from 'utils/lib';
import data from './data';
import dataAuto from './data-auto';
import dataVTL from './data-vtl';
import { labelPositionOptions, featuresOptions } from '../utils/options';
import { text, boolean, object, select } from '@storybook/addon-knobs/react';
import { SuggesterLoaderWidget } from 'components';
import * as NAF from './naf-rev2';
import * as COG from './cog-communes';
import * as BAILLEURS from './bailleurs-sociaux';
import * as BAILLEURS2021 from './bailleurs-sociaux-2021';
import SuggesterMaterialUI from './suggester-material-ui';
/**
 *
 */
function getSuggesterInfo(name) {
	if (name === 'naf-rev2') {
		return { optionRenderer: NAF.OptionRenderer, idbVersion: '1' };
	} else if (name === 'cog-communes') {
		return { optionRenderer: COG.OptionRenderer, idbVersion: '1' };
	} else if (name === 'bailleurs-sociaux') {
		return { optionRenderer: BAILLEURS.OptionRenderer, idbVersion: '1' };
	} else if (name === 'bailleurs-sociaux-2021') {
		return { idbVersion: '1' };
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
	} else if (name === 'bailleurs-sociaux') {
		return { fetch: BAILLEURS.fetch, idbVersion: '1' };
	} else if (name === 'bailleurs-sociaux-2021') {
		return { fetch: BAILLEURS2021.fetch, idbVersion: '1' };
	}
	console.warn(`Unknown store : ${name}`);
	return {};
}

const stories = storiesOf('Suggester/Manual loading', module)
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
				absolute
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

const storiesAuto = storiesOf('Suggester/Auto loading', module)
	.addDecorator(withReadme(readme))
	.addDecorator((Component) => {
		const WrappedComponent = titleDecorator(Component);
		return <WrappedComponent title="<Suggester />" />;
	});

const suggesterFetcher = (url) =>
	fetch(url, {
		headers: { Accept: 'application/json' },
	});

storiesAuto.addWithJSX('Default', () => (
	<Orchestrator
		id="default"
		source={dataAuto}
		suggesters={{
			'naf-rev2': {
				url: 'https://inseefr.github.io/Lunatic/storybook/naf-rev2.json',
			},
			'naf-rev2-stop': {
				url: 'https://inseefr.github.io/Lunatic/storybook/naf-rev2.json',
				stopWords: [],
			},
			'cog-communes': {
				url: 'https://inseefr.github.io/Lunatic/storybook/communes-2019.json',
			},
		}}
		suggesterFetcher={suggesterFetcher}
		autoSuggesterLoading
		pagination
	/>
));

stories.addWithJSX('Custom suggester', function () {
	const { components } = data;
	const customized = components.map(function (component) {
		const { componentType } = component;
		if (componentType === 'Suggester') {
			return { ...component, custom: SuggesterMaterialUI };
		}
		return component;
	});

	return (
		<Orchestrator
			id="default"
			source={{ ...data, components: customized }}
			suggesterFetcher={suggesterFetcher}
			autoSuggesterLoading
			pagination
		/>
	);
});
