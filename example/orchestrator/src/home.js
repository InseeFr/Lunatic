import React, { useState } from 'react';
import logo from './img/lunatic-logo.png';
import Mode from './mode';
import { CollectOrchestrator, ManagementOrchestrator } from './orchestrator';
import * as S from './sources';
import { dependencies } from '../package.json';

const options = [
	{ value: 'none-collect', label: 'Collect - None', q: S.simpsonsCollect },
	{
		value: 'sequences-collect',
		label: 'Collect - Sequences',
		q: S.simpsonsSequenceCollect,
	},
	{
		value: 'questions-collect',
		label: 'Collect - Questions',
		q: S.simpsonsQuestionCollect,
	},
	{
		value: 'none-management',
		label: 'None - Management',
		q: S.simpsonsManagement,
	},
	{
		value: 'sequences-management',
		label: 'Sequences - Management',
		q: S.simpsonsSequenceManagement,
	},
	{
		value: 'questions-management',
		label: 'Questions - Management',
		q: S.simpsonsQuestionManagement,
	},
];

const Home = () => {
	const [mode, setMode] = useState('');

	const pagination =
		mode && (mode.includes('sequences') || mode.includes('questions'));

	return (
		<>
			<div className="lunatic-img-container">
				<img className="lunatic-img" alt="lunatic" src={logo} />
				<div>{`Lunatic version: ${dependencies['@inseefr/lunatic'].replace(
					'^',
					''
				)}`}</div>
			</div>
			<Mode value={mode} setValue={setMode} options={options} />
			{mode && mode.includes('collect') && (
				<CollectOrchestrator
					source={
						options.find(({ value }) => value === mode)?.q || S.simpsonsCollect
					}
					pagination={pagination}
					mode={mode}
				/>
			)}
			{mode && mode.includes('management') && (
				<ManagementOrchestrator
					source={
						options.find(({ value }) => value === mode)?.q ||
						S.simpsonsManagement
					}
					pagination={pagination}
					mode={mode}
				/>
			)}
		</>
	);
};

export default Home;
