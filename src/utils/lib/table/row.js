export const emptyTableRow = index => components =>
	components.filter(({ response }) => {
		return (
			response &&
			response.valueState &&
			response.valueState.find(v => v.valueType === 'COLLECTED') &&
			response.valueState.find(v => v.valueType === 'COLLECTED').value &&
			response.valueState.find(v => v.valueType === 'COLLECTED').value[index]
		);
	}).length === 0;
