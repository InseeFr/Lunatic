import React from 'react';
import * as lunatic from 'components';

const OrchestratorForStories = ({
	source,
	data = {},
	management = false,
	features,
	...rest
}) => {
	const preferences = management
		? ['COLLECTED', 'FORCED', 'EDITED']
		: ['COLLECTED'];
	const savingType = management ? 'EDITED' : 'COLLECTED';
	const {
		questionnaire,
		handleChange,
		components,
		bindings,
	} = lunatic.useLunatic(
		source,
		data,
		savingType,
		preferences,
		features,
		management
	);

	console.log(lunatic.getState(questionnaire));

	return (
		<div className="container">
			<div className="components">
				{components.map((q) => {
					const { id, componentType } = q;
					const Component = lunatic[componentType];
					return (
						<div className="lunatic lunatic-component" key={`component-${id}`}>
							<Component
								{...q}
								{...rest}
								handleChange={handleChange}
								preferences={preferences}
								management={management}
								features={features}
								bindings={bindings}
								writable
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default OrchestratorForStories;
