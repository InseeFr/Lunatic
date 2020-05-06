export const calculatedState = {
	VAR_CALCULATED: null,
};
export const collectedState = {
	input: {
		PREVIOUS: null,
		COLLECTED: 'My input',
		FORCED: null,
		EDITED: null,
		INPUTED: null,
	},
	check1: {
		PREVIOUS: null,
		COLLECTED: true,
		FORCED: null,
		EDITED: null,
		INPUTED: null,
	},
	check2: {
		PREVIOUS: null,
		COLLECTED: false,
		FORCED: true,
		EDITED: null,
		INPUTED: null,
	},
	table11: {
		PREVIOUS: null,
		COLLECTED: '1',
		FORCED: null,
		EDITED: null,
		INPUTED: null,
	},
	table12: {
		PREVIOUS: null,
		COLLECTED: null,
		FORCED: null,
		EDITED: null,
		INPUTED: null,
	},
};

export const externalState = { VAR_EXTERNAL: 'Value VAR_EXTERNAL' };

export const state = {
	EXTERNAL: externalState,
	CALCULATED: calculatedState,
	COLLECTED: collectedState,
};

export const collectedStateCollected = {
	input: 'My input',
	check1: true,
	check2: false,
	table11: '1',
};

export const collectedStateCollectedWithNull = {
	...collectedStateCollected,
	table12: null,
};

export const bindingsResults = {
	...collectedStateCollectedWithNull,
	VAR_CALCULATED: null,
	...externalState,
};
