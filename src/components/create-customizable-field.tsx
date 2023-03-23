import type {
	FunctionComponent,
	ComponentType,
	PropsWithoutRef,
	PropsWithRef,
} from 'react';
import { memo } from 'react';
import { useLunaticCustom } from '../use-lunatic/lunatic-context';

/**
 * Make a component replaceable using the "custom" property declared when using useLunatic
 */
export function createCustomizableLunaticField<
	T extends Record<string, unknown>
>(LunaticField: FunctionComponent<T>, name: string): ComponentType<T> {
	const Memoized = memo<T>(LunaticField);

	return function OverlayField(props: T) {
		const custom = useLunaticCustom();

		if (typeof custom === 'object' && name in custom) {
			const CustomComponent = custom[name];
			return <CustomComponent {...props} />;
		}

		return <Memoized {...props} />;
	};
}
