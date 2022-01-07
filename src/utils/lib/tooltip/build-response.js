// import { buildNewValue } from '../../to-expose/handler';
// import * as C from '../../../constants/value-types';

// export const buildMultiTooltipResponse = (options) => (response) => {
// 	if (!response || Object.keys(response).length === 0 || !options) return {};
// 	const { name, values } = response;
// 	const newValues = Object.entries(values).reduce(
// 		(acc, [k, v]) =>
// 			v === null
// 				? { ...acc, [k]: v }
// 				: { ...acc, [k]: options.find((o) => o.value === v).label },
// 		{}
// 	);
// 	return { name, values: newValues };
// };

// export const buildBooleanTooltipResponse = (response) => {
// 	if (!response || Object.keys(response).length === 0) return {};
// 	const { name, values } = response;
// 	const newValues = Object.entries(values).reduce(
// 		(acc, [k, v]) =>
// 			v === null ? { ...acc, [k]: v } : { ...acc, [k]: v ? 'Vrai' : 'Faux' },
// 		{}
// 	);
// 	return { name, values: newValues };
// };

// /**
//  * Assume we use this tool in management mode only
//  */
// export const buildLocalResponse = (response, value) => {
// 	if (!response || Object.keys(response).length === 0) return {};
// 	const { name, values } = response;
// 	const newValue = buildNewValue([C.COLLECTED, C.FORCED, C.EDITED])(C.EDITED)(
// 		values
// 	)(value);
// 	return {
// 		name,
// 		values: { ...values, EDITED: newValue },
// 	};
// };
