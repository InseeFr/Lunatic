import React, { useState } from 'react';
import logo from './img/lunatic-logo.png';
import CollectOrchestrator from './collect';
import ManagementOrchestrator from './management';
import './custom-lunatic.scss';

const Home = () => {
	const [fakeRoute, setFakeRoute] = useState('/collect');
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
			</div>
			{fakeRoute === '/collect' ? (
				<CollectOrchestrator />
			) : (
				<ManagementOrchestrator />
			)}
		</>
	);
};

export default Home;
