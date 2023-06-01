import { useCallback } from 'react';

type Args<T> = {
	handleChange: (
		response: { name: string },
		value: T,
		args?: Record<string, unknown>
	) => void;
	response: { name: string; value?: unknown };
	value: unknown;
	responses?: Array<{ id: string; response: { name: string } }>;
};

function useOnHandleChange<T>({
	handleChange,
	response,
	value,
	responses,
}: Args<T>) {
	return useCallback(
		function (valueOption: T) {
			if (value !== valueOption) {
				console.log('response', response);
				console.log('value', value);
				console.log('valueOption', valueOption);
				console.log('responses', responses);
				if (responses) {
					responses?.forEach((r) => {
						console.log('r', r);
						handleChange(r.response, valueOption[r.id]);
					});
				} else {
					handleChange(response, valueOption);
				}
			}
		},
		[handleChange, response, responses, value]
	);
}

export default useOnHandleChange;
