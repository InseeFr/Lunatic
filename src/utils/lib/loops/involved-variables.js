export const getInvolvedVariables = components =>
	components.reduce((_, c) => {
		const { response, responses, components } = c;
		if (response && response.name) return [..._, response.name];
		if (responses || components)
			return [..._, getInvolvedVariables(responses || components)];
		return _;
	}, []);
