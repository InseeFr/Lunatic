import React, { useState, useMemo, useEffect } from 'react';
import Orchestrator from '../utils/orchestrator';
import defaultArgTypes from '../utils/default-arg-types';
import { SearchIndexedDB } from '../../utils/search/SearchIndexedDB';
import { objectMap } from '../../utils/object';
import { SearchFlexSearch } from '../../utils/search/SearchFlexSearch';
import { SearchOrama } from '../../utils/search/SearchOrama';
import { SearchMinisearch } from '../../utils/search/SearchMinisearch';

const stories = {
	title: 'Behaviour/Search',
	component: Orchestrator,
	argTypes: defaultArgTypes,
};

export default stories;

const indexes = [
	{
		responseNames: ['VARIABLE_COMMUNE'],
		name: 'L_COMMUNEPASSEE-1-2-0',
		fields: [
			{
				name: 'label',
				rules: ['[\\w]+'],
				language: 'French',
				min: 3,
				stemmer: false,
			},
		],
		queryParser: {
			type: 'tokenized',
			params: {
				language: 'French',
				pattern: '[\\w.]+',
				min: 3,
				stemmer: false,
			},
		},
		version: '1',
	},
	{
		responseNames: ['VARIABLE_PAYS'],
		name: 'L_PAYS-1-2-0',
		fields: [
			{
				name: 'label',
				rules: ['[\\w]+'],
				language: 'French',
				min: 3,
				stemmer: false,
			},
		],
		queryParser: {
			type: 'tokenized',
			params: {
				language: 'French',
				pattern: '[\\w.]+',
				min: 3,
				stemmer: false,
			},
		},
		version: '1',
	},
	{
		responseNames: ['VARIABLE_NATIONALITE'],
		name: 'L_NATIONALITE-1-2-0',
		fields: [
			{
				name: 'label',
				rules: ['[\\w]+'],
				language: 'French',
				stemmer: false,
			},
		],
		queryParser: {
			type: 'tokenized',
			params: {
				language: 'French',
				pattern: '[\\w.]+',
				stemmer: false,
			},
		},
		version: '1',
	},
	{
		responseNames: ['VARIABLE_PCS'],
		name: 'L_PCS_HOMMES-1-5-0',
		fields: [
			{
				name: 'label',
				rules: ['[\\w]+'],
				language: 'French',
				stemmer: false,
				synonyms: {
					accueil: ['ACCEUIL'],
					échafaudage: ['ECHAFFAUDAGE'],
					URSSAF: ['URSAF', 'URSAFF'],
					ingénierie: ['INGENIEURIE', 'INGENERIE', 'INGIENERIE'],
					construction: ['CONSTRUCTEUR'],
					distribution: ['DISTRIBUTEUR'],
					fabrication: ['FABRICANT'],
					abattoir: ['ABATOIR', 'ABBATOIR', 'ABATOIRE', 'ABATTOIRE'],
					ascenseur: ['ASCENCEUR'],
					ascenseurs: ['ASCENCEURS'],
					assenseur: ['ASSENCEUR'],
					assenseurs: ['ASSENCEURS'],
					joaillerie: ['JOAILLIER'],
					agroalimentaire: ['AGGROALIMANTAIRE', 'AGROALIMANTAIRE'],
					alimentaires: ['ALIMANTAIRES'],
					agroalimentaires: ['AGGROALIMANTAIRES', 'AGROALIMENTAIRES'],
				},
			},
		],
		queryParser: {
			type: 'tokenized',
			params: {
				language: 'French',
				pattern: '[\\w.]+',
				stemmer: false,
			},
		},
		version: '1',
		meloto: true,
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
	},
	{
		responseNames: ['VARIABLE_BAILLEURS_SOCIAUX'],
		name: 'bailleurs_sociaux-1-5-0',
		fields: [
			{
				name: 'label',
				rules: ['[\\w]+'],
				language: 'French',
				stemmer: false,
			},
		],
		queryParser: {
			type: 'tokenized',
			params: {
				language: 'French',
				pattern: '[\\w.]+',
				stemmer: false,
			},
		},
		version: '1',
	},
];

const Template = (args) => {
	const [index, setIndex] = useState(indexes[0]);
	const searches = useMemo(
		() => ({
			IDB: new SearchIndexedDB(index),
			FlexSearch: new SearchFlexSearch(index),
			Orama: new SearchOrama(index),
			Minisearch: new SearchMinisearch(index),
		}),
		[index]
	);
	const [results, setResults] = useState(() =>
		objectMap(searches, (k, v) => [k, []])
	);
	const [search, setSearch] = useState('');
	const [indexed, setIndexed] = useState(null);
	const isIndexed = indexed === index.name;

	const handleIndex = async () => {
		const data = await fetch(`./${index.name}.json`).then((r) => r.json());
		await Promise.all(
			Object.keys(searches).map(async (k) => {
				const title = `Indexation ${k}`;
				performance.mark(title + '/start');
				console.time(title);
				await searches[k].index(data);
				console.timeEnd(title);
				await wait(1000);
			})
		);
		setIndexed(index.name);
		await wait(500);
		setSearch(index.name === 'L_PCS_HOMMES-1-5-0' ? 'chef élec' : 'St étienn');
	};

	const handleSearch = async (s: string) => {
		objectMap(searches, async (k, v) => {
			const title = `Search "${s}" ${k}`;
			console.time(title);
			const data = await v.search(s);
			console.timeEnd(title);
			await wait(1000);
			setResults((r) => ({
				...r,
				[k]: data,
			}));
		});
	};

	useEffect(() => {
		if (!search) {
			return;
		}
		const timer = setTimeout(() => {
			handleSearch(search);
		}, 500);
		return () => clearTimeout(timer);
	}, [search]);

	useEffect(() => {
		console.log(results);
	}, [results]);
	return (
		<div
			style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr' }}
		>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
				<fieldset>
					<label htmlFor="index">Index : </label>
					<select
						id="index"
						onChange={(e) =>
							setIndex(indexes.find((i) => i.name === e.target.value))
						}
						value={index.name}
					>
						{indexes.map((i) => (
							<option key={i.name} value={i.name}>
								{i.name}
							</option>
						))}
					</select>
				</fieldset>
				<div style={{ display: 'flex' }}>
					<button onClick={handleIndex}>Indexer</button>
					<input
						disabled={!isIndexed}
						type="text"
						onInput={(e) => setSearch(e.target.value)}
						value={search}
						placeholder="Rechercher"
					/>
				</div>
			</div>
			{Object.keys(results).map((name) => (
				<div key={name}>
					<h5>{name}</h5>
					<ul>
						{results[name].map((row) => (
							<li key={row.label}>{row.label ?? row.id}</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};

function wait(d: number) {
	return new Promise((r) => setTimeout(r, d));
}

export const Default = Template.bind({});
