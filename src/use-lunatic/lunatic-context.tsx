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
	componentsOptions: { detailAlwaysDisplayed: false },
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

export const useLunaticComponentsOptions = () => {
	const { componentsOptions } = useContext(LunaticContext);
	return componentsOptions;
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
	componentsOptions,
}: {
	management: boolean;
	missing: boolean;
	missingStrategy: () => void;
	shortcut: boolean;
	missingShortcut: { dontKnow: string; refused: string };
	dontKnowButton: string;
	refusedButton: string;
	componentsOptions: { detailAlwaysDisplayed: boolean };
}): FunctionComponent<PropsWithChildren> {
	const value = {
		management,
		missing,
		missingStrategy,
		shortcut,
		missingShortcut,
		dontKnowButton,
		refusedButton,
		componentsOptions,
	};
	return function Provider({ children }: PropsWithChildren) {
		return (
			<LunaticContext.Provider value={value}>
				{children}
			</LunaticContext.Provider>
		);
	};
}
