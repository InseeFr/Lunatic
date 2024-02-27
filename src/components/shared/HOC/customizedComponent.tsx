import { type ComponentType, type FunctionComponent, memo } from 'react';
import { useLunaticCustom } from '../../../use-lunatic/lunatic-context';

/**
 * Create a replaceable version of a component
 */
export function customizedComponent<T extends Record<string, unknown>>(
	name: string,
	LunaticField: FunctionComponent<T>
): ComponentType<T> {
	const Memoized = memo(LunaticField);
	Memoized.displayName = name;

	return function OverlayField(props) {
		const custom = useLunaticCustom();

		if (typeof custom === 'object' && name in custom) {
			const CustomComponent = custom[name];
			return <CustomComponent {...props} />;
		}

		return <Memoized {...props} />;
	};
}
