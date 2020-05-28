import React from 'react';
import * as lunatic from 'components';

const OrchestratorForStories = ({
	savingType,
	preferences,
	source,
	data,
	tooltip,
	features,
	filterDescription,
}) => {
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
		tooltip
	);

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
								tooltip={tooltip}
								filterDescription={filterDescription}
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
