import { buildNullNestedArray } from './array';

export const DK = 'DK';
export const RF = 'RF';
export const getToClean =
	(savingType) =>
	({ response, responses, cells, components }) => {
		if (response) {
			const resValues = response.values[savingType];
			if (resValues !== null) {
				if (Array.isArray(resValues)) {
					//handle nested array
					return { [response.name]: buildNullNestedArray(resValues) };
				}
				return { [response.name]: null };
			}
			return {};
		}
		if (responses || cells || components) {
			const group = responses || cells || components;
			return group
				.flat(Infinity)
				.reduce((acc, c) => ({ ...acc, ...getToClean(savingType)(c) }), {});
		}
		return false;
	};

export const cleanMissing = ({ response, responses, cells, components }) =>
	true;
