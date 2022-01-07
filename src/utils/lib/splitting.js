const getBindingsDependenciesCalculated = (variables) => {
	if (!variables) return {};
	return variables.reduce((acc, { name, bindingDependencies, shapeFrom }) => {
		if (shapeFrom && bindingDependencies)
			return { ...acc, [name]: [...bindingDependencies, shapeFrom] };
		if (bindingDependencies) return { ...acc, [name]: bindingDependencies };
		if (shapeFrom) return { ...acc, [name]: [shapeFrom] };
		return acc;
	}, {});
};

const getAllDeps = (deps) => (variablesCalcDeps) => {
	if (!deps || !variablesCalcDeps) return [];
	return deps.reduce((acc, dep) => {
		const depsOfDep = variablesCalcDeps[dep];
		if (Array.isArray(depsOfDep)) {
			return [...acc, dep, ...getAllDeps(depsOfDep)(variablesCalcDeps)];
		}
		return [...acc, dep];
	}, []);
};

const getNestedVarsInFilterOrControl = (element) => {
	if (element && Array.isArray(element?.bindingDependencies))
		return element?.bindingDependencies;
	return [];
};

const getNestedVarsInComponent = (component) => {
	const {
		componentType,
		bindingDependencies = [],
		conditionFilter,
		controls = [],
	} = component;
	var bindings = [
		...bindingDependencies, // bindingDependencies of Component
		...getNestedVarsInFilterOrControl(conditionFilter), // bindingDependencies of its conditionFilter
		...controls.reduce(
			(acc, c) => [...acc, ...getNestedVarsInFilterOrControl(c)],
			[]
		), // bindingDependencies of its controls
	];

	if (componentType === 'Loop') {
		const { components, loopDependencies } = component;
		if (Array.isArray(loopDependencies))
			bindings = [...bindings, ...loopDependencies];
		if (Array.isArray(components)) {
			bindings = components.reduce(
				(acc, c) => [...acc, ...getNestedVarsInComponent(c)],
				[...bindings]
			);
		}
	}

	return bindings;
};

const getNestedVars =
	(components = []) =>
	(variables) => {
		const variableCalculatedDependencies =
			getBindingsDependenciesCalculated(variables);
		const depsVarsTemp = components
			.reduce((acc, c) => {
				return [...acc, ...getNestedVarsInComponent(c)];
			}, [])
			.filter((v, i, a) => a.indexOf(v) === i);
		return getAllDeps(depsVarsTemp)(variableCalculatedDependencies).filter(
			(v, i, a) => a.indexOf(v) === i
		);
	};

const getUsefullVariablesFromSource = (variables) => (nestedVars) => {
	return variables.filter(({ variableType, name }) => {
		if (variableType === 'CALCULATED' && !nestedVars.includes(name))
			return false;
		if (variableType === 'COLLECTED' && !nestedVars.includes(name))
			return false;
		return true;
	});
};

export const getSplitQuestionnaireSource = (source) => {
	const { components, variables, ...rest } = source;
	var split = [];
	var currentComponents = [];
	var previousPage = null;
	components.map((c) => {
		const { componentType, page } = c;
		// splitting by Sequence or Loop
		if (
			(componentType === 'Sequence' || componentType === 'Loop') &&
			previousPage !== page
		) {
			if (currentComponents.length > 0) split.push(currentComponents);
			currentComponents = [c];
		} else {
			currentComponents.push(c);
		}
		previousPage = page;
		return null;
	});
	if (currentComponents.length > 0) split.push(currentComponents);

	return split.reduce((prev, currentSource) => {
		const firstPage = currentSource[0].page;
		const maxPage = currentSource[currentSource.length - 1].page;
		const nestedVars = getNestedVars(currentSource)(variables);
		const newVariables = getUsefullVariablesFromSource(variables)(nestedVars);

		return [
			...prev,
			{
				...rest,
				variables: newVariables,
				firstPage,
				maxPage,
				components: currentSource,
			},
		];
	}, []);
};

export const getRootPageInSources = (sources) => {
	return sources.map((source) => {
		const { components } = source;
		return components.reduce((acc, { page }) => {
			if (page) return [...acc, page];
			return acc;
		}, []);
	});
};

export const mergeStateData = (oldData, newData) => {
	return {
		COLLECTED: { ...oldData.COLLECTED, ...newData.COLLECTED },
		CALCULATED: { ...oldData.CALCULATED, ...newData.CALCULATED },
		EXTERNAL: { ...oldData.EXTERNAL, ...newData.EXTERNAL },
	};
};
