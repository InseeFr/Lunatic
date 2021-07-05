export const qRespTrue = {
	response: { name: 'response', values: { COLLECTED: 'toto' } },
	missingResponse: {
		name: 'missingResponse',
		values: { COLLECTED: 'toto' },
	},
};

export const qRespFalse = {
	response: { name: 'response', values: { COLLECTED: null } },
	missingResponse: {
		name: 'missingResponse',
		values: { COLLECTED: 'toto' },
	},
};

export const qRespsTrue = {
	responses: [
		{
			response: { name: 'response1', values: { COLLECTED: 'ok' } },
		},
		{
			response: { name: 'response2', values: { COLLECTED: 'ok' } },
		},
	],
	missingResponse: {
		name: 'missingResponse',
		values: { COLLECTED: 'toto' },
	},
};

export const qRespsFalse = {
	responses: [
		{
			response: { name: 'response1', values: { COLLECTED: null } },
		},
		{
			response: { name: 'response2', values: { COLLECTED: null } },
		},
	],
	missingResponse: {
		name: 'missingResponse',
		values: { COLLECTED: 'toto' },
	},
};

export const qCellsTrue = {
	cells: [
		[
			{ label: 'line1' },
			{
				response: { name: 'response1', values: { COLLECTED: null } },
			},
		],
		[
			{ label: 'line2' },
			{
				response: { name: 'response2', values: { COLLECTED: 'ok' } },
			},
		],
	],
};

export const qCellsFalse = {
	cells: [
		[
			{ label: 'line1' },
			{
				response: { name: 'response1', values: { COLLECTED: null } },
			},
		],
		[
			{ label: 'line2' },
			{
				response: { name: 'response2', values: { COLLECTED: null } },
			},
		],
	],
};

export const qComponentsTrue = {
	components: [
		{
			response: { name: 'response1', values: { COLLECTED: null } },
		},
		{
			responses: [
				{
					response: {
						name: 'response2',
						values: {
							COLLECTED: [
								['ok', 'ok'],
								['ok', 'ok'],
							],
						},
					},
				},
			],
		},
		{
			cells: [
				[
					{ label: 'line1' },
					{
						response: { name: 'response3', values: { COLLECTED: 'ok' } },
					},
				],
			],
		},
	],
};

export const qComponentsFalse = {
	components: [
		{
			response: { name: 'response1', values: { COLLECTED: null } },
		},
		{
			responses: [
				{
					response: { name: 'response2', values: { COLLECTED: null } },
				},
			],
		},
		{
			cells: [
				[
					{ label: 'line1' },
					{
						response: { name: 'response3', values: { COLLECTED: null } },
					},
				],
			],
		},
	],
};
