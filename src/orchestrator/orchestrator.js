import React, { useState } from 'react';
import * as lunatic from '@inseefr/lunatic';

const Orchestrator = ({ savingType, preferences, source, data, tooltip }) => {
	const [questionnaire, setQuestionnaire] = useState(
		lunatic.mergeQuestionnaireAndData(source)(data)
	);
	const onChange = updatedValue => {
		setQuestionnaire(
			lunatic.updateQuestionnaire(savingType)(questionnaire)(preferences)(
				updatedValue
			)
		);
	};
	console.log('State : ', lunatic.getState(questionnaire));
	const components = questionnaire.components.map(q => {
		const { id, componentType } = q;
		const Component = lunatic[componentType];
		return (
			<div className="lunatic lunatic-component" key={`component-${id}`}>
				<Component
					{...q}
					handleChange={onChange}
					labelPosition="TOP"
					preferences={preferences}
					tooltip={tooltip}
				/>
			</div>
		);
	});
	return (
		<div className="container">
			<div className="components">{components}</div>
		</div>
	);
};

export default Orchestrator;
