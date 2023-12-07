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
		name: 'libelles-pcs-2020',
		max: 100,
		fields: [
			{
				name: 'id',
				rules: ['[\\w]+'],
				language: 'French',
				min: 2,
				stemmer: false,
			},
		],
		queryParser: {
			type: 'tokenized',
			params: {
				language: 'French',
				pattern: '[\\w]+',
				min: 3,
				stemmer: false,
			},
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
	},
	{
		name: 'communes-2023',
		max: 100,
		fields: [
			{
				name: 'id',
				rules: 'soft',
			},
		],
		queryParser: {
			type: 'soft',
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
		const data = await fetch(`/${index.name}.json`).then((r) => r.json());
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
		setSearch(
			index.name === 'libelles-pcs-2020' ? 'abat arbre' : 'Montpellier'
		);
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
							<li key={row.id}>{row.id}</li>
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
