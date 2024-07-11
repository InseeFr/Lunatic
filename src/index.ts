/**
 * We should remove this export to avoid `import * as lunatic from "@inseefr/lunatic"` in orchestrators
 *  but this is a breaking change
 */
export { library as components } from './components/library';
export { ModalControls } from './components/shared/ModalControls/ModalControls';
export { Button } from './components/shared/Button/Button';

export { LunaticComponents } from './components/LunaticComponents';
export { useLunatic } from './use-lunatic/use-lunatic';

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
	LunaticPager,
	LunaticOptions,
	LunaticChangesHandler,
} from './use-lunatic/type';

export type {
	LunaticComponentProps,
	LunaticExtraProps,
} from './components/type';
export type { LunaticSlotComponents } from './components/shared/HOC/slottableComponent';
export type { LunaticSource } from './use-lunatic/type';

// Export errors (useful for typeof)
export {
	VTLMissingDependencies,
	VTLExpressionError,
	VTLMissingDependency,
	VTLInterpretationError,
} from './use-lunatic/commons/variables/errors';
