import React from 'react';
import { storiesOf } from '@storybook/react';
import { clearDb, openOnCreateDb, insertEntity } from '../../utils/idb-tools';
import { CONSTANTES } from '../../utils/store-tools';
import append from '../../utils/suggester-workers/append-to-index';

const stories = storiesOf('Suggester/workers', module);

function fetchCog() {
	return fetch('/communes-2019.json').then((r) => r.json());
}

function fetchNaf() {
	return fetch('naf-rev2.json').then((r) => r.json());
}

const infoCog = {
	name: 'cog-communes',
	fields: [
		{ name: 'label', rules: 'soft' },
		{ name: 'nccenr', rules: 'soft' },
		{ name: 'id', rules: 'soft' },
	],
	queryParser: { type: 'soft' },
	version: '1',
	display: 'label',
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
};

async function loadCog() {
	const { name } = infoCog;
	const communes = await fetchCog();
	const db = await openOnCreateDb(name);
	await clearDb(db, CONSTANTES.STORE_DATA_NAME);
	await clearDb(db, CONSTANTES.STORE_INFO_NAME);
	await append(infoCog, '1', communes, console.log);
	await insertEntity(db, CONSTANTES.STORE_INFO_NAME, infoCog);
}

async function loadNaf() {
	const { name } = infoNaf;
	const rubriques = await fetchNaf();
	const db = await openOnCreateDb(name);
	await clearDb(db, CONSTANTES.STORE_DATA_NAME);
	await clearDb(db, CONSTANTES.STORE_INFO_NAME);
	await append(infoNaf, '1', rubriques, console.log);
	await insertEntity(db, CONSTANTES.STORE_INFO_NAME, infoNaf);
}

stories.addWithJSX('Default', () => {
	return (
		<>
			<p>
				Juste pour tester l'intégration du code des workers et faciliter leur
				mise à jour. Le chargement ne passe pas par les web workers pour
				permettre le debug.
			</p>
			<ul
				style={{ listStyleType: 'none', margin: 0, padding: 0, border: 'none' }}
			>
				<li>
					<input type="button" value="load COG" onClick={loadCog} />
				</li>
				<li>
					<input type="button" value="load NAF" onClick={loadNaf} />
				</li>
			</ul>
		</>
	);
});
