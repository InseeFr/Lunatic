import { ComponentType, FunctionComponent, memo } from 'react';
import { useLunaticCustom } from '../../use-lunatic/lunatic-context';

function createCustomizableLunaticField<T extends Record<string, unknown>>(
	LunaticField: FunctionComponent<T>,
	name: string
): ComponentType<T> {
	const Memoized = memo(LunaticField);

	return function OverlayField(props) {
		const custom = useLunaticCustom();

		if (typeof custom === 'object' && name in custom) {
			const CustomComponent = custom[name];
			return <CustomComponent {...props} />;
		}

		return <Memoized {...props} />;
	};
}

export default createCustomizableLunaticField;
