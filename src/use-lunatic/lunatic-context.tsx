import {
	type FunctionComponent,
	type PropsWithChildren,
	createContext,
	useContext,
} from 'react';

import D from '../i18n/index';
import type { LunaticOptions } from './type';

type LunaticContextType = {
	missingStrategy?: LunaticOptions['missingStrategy'];
	management?: LunaticOptions['management'];
	missing?: LunaticOptions['missing'];
	shortcut?: LunaticOptions['shortcut'];
	missingShortcut?: LunaticOptions['missingShortcut'];
	dontKnowButton?: LunaticOptions['dontKnowButton'];
	refusedButton?: LunaticOptions['refusedButton'];
	componentsOptions?: LunaticOptions['componentsOptions'];
};

/** Mandatory values used as a context's last-resort fallback. */
const defaultValues = {
	missingStrategy: () => {},
	management: false,
	missing: false,
	shortcut: false,
	missingShortcut: { dontKnow: '', refused: '' },
	dontKnowButton: D.DK,
	refusedButton: D.RF,
	componentsOptions: {
		detailAlwaysDisplayed: false,
		disableRosterForLoopDeleteRowButton: false,
	},
};

/** Expose specific Lunatic options to handle some (e.g. missing, management, components options) */
export const LunaticContext = createContext<LunaticContextType>(defaultValues);

/**
 * Provide `missing`, `missingStrategy`, `shortcut` and `missingShortcut`,
 * `dontKnowButton`, `refusedButton` to `Missing` component to manage
 * non-response buttons and shortcut.
 */
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

/** Expose the specified options to override default component behaviour. */
export const useLunaticComponentsOptions = () => {
	const { componentsOptions } = useContext(LunaticContext);
	return componentsOptions ?? {};
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
}: LunaticContextType): FunctionComponent<PropsWithChildren> {
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
