import { useCallback } from 'react';

type Args<T> = {
	handleChange: (
		response: { name: string },
		value: T,
		args?: Record<string, unknown>
	) => void;
	response: { name: string; value?: unknown };
	value: unknown;
};

function useOnHandleChange<T>({ handleChange, response, value }: Args<T>) {
	console.log("response",response);
	
	return useCallback(
		function (valueOption: T) {
			if (value !== valueOption) {
				handleChange(response, valueOption);
			}
		},
		[handleChange, response, value]
	);
}

export default useOnHandleChange;
