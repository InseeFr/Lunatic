import React, { useState } from 'react';
import logo from './img/lunatic-logo.png';
import Mode from './mode';
import { CollectOrchestrator, ManagementOrchestrator } from './orchestrator';
import { simpsons, simpsonsSequence, simpsonsQuestion } from './sources';
import { dependencies } from '../package.json';

const options = [
	{ value: 'none', label: 'None', q: simpsons },
	{ value: 'sequences', label: 'Sequences', q: simpsonsSequence },
	{ value: 'questions', label: 'Questions', q: simpsonsQuestion },
];

const Home = () => {
	const [fakeRoute, setFakeRoute] = useState('/collect');
	const [paginationType, setPaginationType] = useState('none');

	const source =
		options.find(({ value }) => value === paginationType)?.q || simpsons;

	const pagination = ['sequences', 'questions'].includes(paginationType);

	return (
		<>
			<div className="lunatic-img-container">
				<img
					className="lunatic-img"
					alt="lunatic"
					src={logo}
					onClick={() =>
						fakeRoute === '/collect'
							? setFakeRoute('/management')
							: setFakeRoute('/collect')
					}
				/>
				<div>{`Lunatic version: ${dependencies['@inseefr/lunatic'].replace(
					'^',
					''
				)}`}</div>
			</div>
			<Mode
				value={paginationType}
				setValue={setPaginationType}
				options={options}
			/>
			{fakeRoute === '/collect' ? (
				<CollectOrchestrator
					source={source}
					pagination={pagination}
					paginationType={paginationType}
				/>
			) : (
				<ManagementOrchestrator
					source={source}
					pagination={pagination}
					paginationType={paginationType}
				/>
			)}
		</>
	);
};

export default Home;
