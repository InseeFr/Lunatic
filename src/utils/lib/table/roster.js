const isResponseEmpty = (response) =>
	Object.values(response.values).filter((v) => v !== null).length === 0;

export const getRosterInitLines = (cells) =>
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
				.filter((b) => b).length
		: 0;

// TOD: Improve
export const getRosterVectorInitLines = (components) =>
	Array.isArray(components)
		? components.reduce(
				(_, c) =>
					c.response
						? c.response.valueState[0].value.length > _
							? c.response.valueState[0].value.length
							: _
						: _,
				0
		  )
		: 0;
