/**
 * We should remove this export to avoid `import * as lunatic from "@inseefr/lunatic"` in orchestrators
 *  but this is a breaking change
 */
export * from './components/library';
export * as components from './components/library';

export { LunaticComponents } from './components/LunaticComponents';
export { default as useLunatic } from './use-lunatic';

export type {
	LunaticComponentDefinition,
	LunaticControl,
	LunaticData,
	LunaticValues,
	LunaticError,
	LunaticExpression,
	LunaticVariable,
	LunaticCollectedValue,
	LunaticStateVariable,
	LunaticState,
} from './use-lunatic/type';

export type { LunaticComponentProps } from './components/type';
export type { LunaticSource } from './use-lunatic/type-source';
