import React from 'react';
import * as lunatic from '@inseefr/lunatic';

const Orchestrator = ({
	savingType,
	preferences,
	source,
	features,
	data,
	management,
	filterDescription,
}) => {
	const {
		questionnaire,
		components,
		handleChange,
		bindings,
	} = lunatic.useLunatic(source, data, {
		savingType,
		preferences,
		features,
		management,
	});

	console.log(lunatic.getCollectedState(questionnaire));

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
								handleChange={handleChange}
								labelPosition="TOP"
								preferences={preferences}
								management={management}
								filterDescription={filterDescription}
								features={features}
								bindings={bindings}
								writable
								zIndex={1}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Orchestrator;
