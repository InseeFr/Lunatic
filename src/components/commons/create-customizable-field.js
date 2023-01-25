import React, { useContext } from 'react';
import LunaticContext from '../../use-lunatic/lunatic-context';

function createCustomizableLunaticField(LunaticField, name) {
	const Memoized = React.memo(LunaticField);

	return function OverlayField(props) {
		const { custom = {} } = useContext(LunaticContext);

		if (typeof custom === 'object' && name in custom) {
			const CustomComponent = custom[name];
			return <CustomComponent {...props} />;
		}

		return <Memoized {...props} />;
	};
}

export default createCustomizableLunaticField;
