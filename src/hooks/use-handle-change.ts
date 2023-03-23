import { useCallback } from 'react';
import { LunaticState } from '../use-lunatic/type';

type Args = {
	handleChange: LunaticState['handleChange'];
	response: { name: string };
	value: unknown;
};

export function useHandleChange({ handleChange, response, value }: Args) {
	return useCallback(
		(v: unknown) => {
			if (value !== v) {
				handleChange(response, v);
			}
		},
		[handleChange, response, value]
	);
}
