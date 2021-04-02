const isResponseEmpty = (response) =>
	Object.values(response.values).filter((v) => v !== null).length === 0;

export const getRosterInitLines = (cells) =>
	Array.isArray(cells)
		? cells
				.filter(
					(line) =>
						line.filter(({ response }) => !response).length !== line.length
				)
				.reduce(
					(_, line) => [
						..._,
						line.reduce((__, { response, label }) => {
							if (label) return true;
							if (__ || !response) return __;
							return !isResponseEmpty(response);
						}, false),
					],
					[]
				)
				.filter((b) => b).length
		: 0;
