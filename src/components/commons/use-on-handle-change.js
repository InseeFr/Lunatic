import { useCallback } from 'react';

function useOnHandleChange({ handleChange, response, value }) {
	const onHandlechange = useCallback(
		function (valueOption) {
			if (value !== valueOption) {
				handleChange(response, valueOption);
			}
		},
		[handleChange, response, value]
	);

	return onHandlechange;
}

export default useOnHandleChange;
