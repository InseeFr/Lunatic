import {
	type FunctionComponent,
	type PropsWithChildren,
	createContext,
	useContext,
} from 'react';

import D from '../i18n/index';

const LunaticContext = createContext({
	missingStrategy: () => {},
	management: false,
	missing: false,
	shortcut: false,
	missingShortcut: { dontKnow: '', refused: '' },
	dontKnowButton: D.DK,
	refusedButton: D.RF,
});
/** Provide `missing` `missingStrategy`, `shortcut` and `missingShortcut`, `dontKnowButton`, `refusedButton` to Missing component
 *  to manage non-response buttons and shortcut */
export const useLunaticMissing = () => {
	const {
		missing,
		missingStrategy,
		shortcut,
		missingShortcut,
		dontKnowButton,
		refusedButton,
	} = useContext(LunaticContext);
	return {
		missing,
		missingStrategy,
		shortcut,
		missingShortcut,
		dontKnowButton,
		refusedButton,
	};
};

/** Provide `management` to display data states [COLLECTED,EDITED,FORCED] */
export const useLunaticManagement = () => {
	return useContext(LunaticContext).management;
};

export function createLunaticProvider({
	management,
	missing,
	missingStrategy,
	shortcut,
	missingShortcut,
	dontKnowButton,
	refusedButton,
}: {
	management: boolean;
	missing: boolean;
	missingStrategy: () => void;
	shortcut: boolean;
	missingShortcut: { dontKnow: string; refused: string };
	dontKnowButton: string;
	refusedButton: string;
}): FunctionComponent<PropsWithChildren> {
	const value = {
		management,
		missing,
		missingStrategy,
		shortcut,
		missingShortcut,
		dontKnowButton,
		refusedButton,
	};
	return function Provider({ children }: PropsWithChildren) {
		return (
			<LunaticContext.Provider value={value}>
				{children}
			</LunaticContext.Provider>
		);
	};
}
