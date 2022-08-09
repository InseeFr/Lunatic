import { useCallback } from 'react';

function useOnHandleChange({ handleChange, response, value }) {
	return useCallback(
		function (valueOption) {
			if (value !== valueOption) {
				handleChange(response, valueOption);
			}
		},
		[handleChange, response, value]
	);
}

export default useOnHandleChange;
