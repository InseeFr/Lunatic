import React, { useState, useCallback } from 'react';
import Orchestrator from '../utils/orchestrator';
import defaultArgTypes from '../utils/default-arg-types';
import { clearDb, openOnCreateDb, insertEntity } from '../../utils/idb-tools';
import append from '../../utils/suggester-workers/append-to-index';
import searching from '../../utils/suggester-workers/searching';
import { Logger } from '../../utils/logger';
import {
	STORE_DATA_NAME,
	STORE_INFO_NAME,
} from '../../constants/indexedDBStore';

const stories = {
	title: 'Behaviour/Suggester',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

function fetchNaf() {
	return fetch('/naf-rev2.json').then((r) => r.json());
}

function fetchFake() {
	return fetch('/fake-nomenclature.json').then((r) => r.json());
}

function fetchPCS2020() {
	return fetch('/libelles-pcs-2020.json').then((r) => r.json());
}

const infoPCS2020 = {
	name: 'libelle-pcs2020',
	fields: [
		{
			name: 'id',
			rules: ['[\\w]+'],
			language: 'French',
			min: 2,
		},
	],
	queryParser: {
		type: 'tokenized',
		params: { language: 'French', pattern: '[\\w]+' },
	},
	meloto: true,
	version: '1',
	stopWords: [
		'a',
		'au',
		'dans',
		'de',
		'des',
		'du',
		'en',
		'er',
		'la',
		'le',
		'ou',
		'sur',
		'd',
		'l',
		'aux',
		'dans',
		'un',
		'une',
		'pour',
		'avec',
		'chez',
		'par',
		'les',
	],
};

const infoFake = {
	name: 'fake',
	fields: [
		{
			name: 'tags',
			rules: ['[\\w]+'],
			language: 'French',
			min: 3,
		},
	],
	queryParser: {
		type: 'tokenized',
		params: { language: 'French', pattern: '[\\w.]+' },
	},
	version: '1',
};

const infoNaf = {
	name: 'naf-rev2',
	fields: [
		{
			name: 'label',
			rules: ['[\\w]+'],
			language: 'French',
			min: 3,
		},
		{ name: 'id' },
	],
	queryParser: {
		type: 'tokenized',
		params: { language: 'French', pattern: '[\\w.]+' },
	},
	version: '1',
	meloto: true,
};

async function loadOne(info, fetchIt) {
	const { name } = info;
	const rubriques = await fetchIt();
	const db = await openOnCreateDb(name);
	await clearDb(db, STORE_DATA_NAME);
	await clearDb(db, STORE_INFO_NAME);
	Logger.log({ info, rubriques });
	await append(info, '1', rubriques, Logger.log);
	await insertEntity(db, STORE_INFO_NAME, info);
}

function Search({ storeInfo, version = '1', max = 30, defaultValue = '' }) {
	const { name, order, meloto } = storeInfo;
	const [value, setValue] = useState(defaultValue);
	const onClick = useCallback(
		function () {
			async function doIt() {
				const results = await searching(value, {
					name,
					version,
					max,
					order,
					meloto,
				});
				Logger.log(results);
			}
			if (value.length) {
				doIt().catch(Logger.error);
			}
		},
		[value, name, version, max, order, meloto]
	);
	return (
		<>
			<input
				type="search"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<input type="button" onClick={onClick} value="Search!" />
		</>
	);
}

const Template = (args) => (
	<>
		<ul>
			<li>
				<input
					type="button"
					value="load PCS2020"
					onClick={() => loadOne(infoPCS2020, fetchPCS2020)}
				/>
				<Search storeInfo={infoPCS2020} defaultValue="st" />
			</li>
			<li>
				<input
					type="button"
					value="load NAF"
					onClick={() => loadOne(infoNaf, fetchNaf)}
				/>
				<Search storeInfo={infoNaf} defaultValue="culture du tabac" />
			</li>
			<li>
				<input
					type="button"
					value="load FAKE"
					onClick={() => loadOne(infoFake, fetchFake)}
				/>
				<Search storeInfo={infoFake} defaultValue="madame" />
			</li>
		</ul>
	</>
);
export const Default = Template.bind({});
