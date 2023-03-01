import {
	FunctionComponent,
	PropsWithChildren,
	createContext,
	useContext,
} from 'react';

import D from '../i18n/index';

const LunaticContext = createContext({
	missingStrategy: () => {},
	management: false,
	missing: false,
	shortcut: false,
	custom: {} as Record<string, FunctionComponent<unknown>>,
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

/** Return custom elements list to override native components */
export const useLunaticCustom = () => {
	return useContext(LunaticContext).custom;
};

/** Provide `management` to display data states [COLLECTED,EDITED,FORCED] */
export const useLunaticManagement = () => {
	return useContext(LunaticContext).management;
};

export function createLunaticProvider({
	custom,
	management,
	missing,
	missingStrategy,
	shortcut,
	missingShortcut,
	dontKnowButton,
	refusedButton,
}: {
	custom: Record<string, FunctionComponent<unknown>>;
	management: boolean;
	missing: boolean;
	missingStrategy: () => void;
	shortcut: boolean;
	missingShortcut: { dontKnow: string; refused: string };
	dontKnowButton: string;
	refusedButton: string;
}): FunctionComponent<PropsWithChildren> {
	const value = {
		custom,
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
