export const getRosterInitLines = cells =>
	Array.isArray(cells)
		? cells
				.reduce(
					(_, line) => [
						..._,
						line.reduce((__, component) => {
							if (!component.response || __) return __;
							return !isResponseEmpty(component.response);
						}, false),
					],
					[]
				)
				.filter(b => b).length
		: 0;

const isResponseEmpty = response =>
	response.valueState.reduce((_, { value }) => {
		if (!_) return _;
		return value === null;
	}, true);
