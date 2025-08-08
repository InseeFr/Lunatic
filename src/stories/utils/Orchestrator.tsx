import {
	LunaticComponents,
	type LunaticData,
	type LunaticError,
	type LunaticSlotComponents,
	type LunaticSource,
	ModalControls,
	useLunatic,
} from '../..';
import React, {
	memo,
	type ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import Ajv from 'ajv/dist/2020.js';
import LunaticSchema from '../../../lunatic-schema.json';
import { Logger } from '../../utils/logger';
import { OrchestratorOverview } from './OrchestratorOverview';
import { SchemaValidator } from './SchemaValidator';
import { OrchestratorData } from './OrchestratorData';
import type { PageTag } from '../../use-lunatic/type';
import type { IndexEntry } from '../../utils/search/SearchInterface';
import { OrchestratorSidebar } from './OrchestratorSidebar';
import type { Meta, StoryObj } from '@storybook/react';
import ReactHotkeys from 'react-hot-keys';

type Props = {
	source: LunaticSource;
	data: LunaticData;
	// Starting page
	initialPage?: PageTag;
	// Function used to load a list of option in a suggester
	getReferentiel: (name: string) => Promise<IndexEntry[]>;
	// Display detail input even if the corresponding checkbox is not checked
	detailAlwaysDisplayed?: boolean;
	// Enable missing buttons
	missing?: boolean;
	// Readonly mode
	readOnly: boolean;
	// List of custom components
	slots: Partial<LunaticSlotComponents>;
	// Last reached paged (used in the overview)
	lastReachedPage: PageTag;
	// Preload suggester data at the start of the form
	autoSuggesterLoading: boolean;
	disableFiltersDescription?: boolean;
	disableFilters?: boolean;
	management?: boolean;
	shortcut?: boolean;
	activeControls?: boolean;
	missingStrategy?: () => void;
	showOverview?: boolean;
	disabled?: boolean;
	extraTabs?: TabEntry[];
	multiMode: boolean;
};

type TabEntry = { label: ReactNode; children: ReactNode };

function OrchestratorForStories(props: Readonly<Props>) {
	const {
		source,
		data,
		disableFilters,
		disableFiltersDescription,
		management,
		shortcut,
		activeControls,
		initialPage,
		missing,
		missingStrategy,
		slots,
		showOverview,
		getReferentiel,
		readOnly,
		disabled,
		detailAlwaysDisplayed,
		autoSuggesterLoading,
		extraTabs = [],
	} = props;

	const componentsOptions = { detailAlwaysDisplayed };

	const {
		getComponents,
		goPreviousPage,
		goNextPage,
		goToPage,
		pager,
		pageTag,
		isFirstPage,
		isLastPage,
		overview,
		compileControls,
		getData,
		Provider,
		hasPageResponse,
		getMultiMode,
	} = useLunatic(source, data, {
		initialPage,
		disableFilters,
		disableFiltersDescription,
		onChange: onLogChange,
		getReferentiel,
		management,
		missing,
		missingStrategy,
		lastReachedPage: props.lastReachedPage,
		missingShortcut: { dontKnow: 'f2', refused: 'f4' },
		shortcut,
		activeControls,
		withOverview: showOverview,
		autoSuggesterLoading,
		componentsOptions,
	});

	const components = getComponents();

	const [errorActive, setErrorActive] = useState<
		Record<PageTag, LunaticError[]>
	>({});
	const [errorsForModal, setErrorsForModal] = useState<null | ReturnType<
		typeof compileControls
	>>(null);

	const skip = useCallback(() => {
		setErrorsForModal(null);
		goNextPage();
	}, [goNextPage]);

	const closeModal = useCallback(() => setErrorsForModal(null), []);

	const handleGoNext = useCallback(() => {
		const { currentErrors, isCritical } = compileControls();
		setErrorActive((v) => ({ ...v, [pageTag]: currentErrors || {} }));
		if (currentErrors && Object.keys(currentErrors).length > 0) {
			setErrorsForModal({ currentErrors, isCritical });
		} else {
			goNextPage();
		}
	}, [compileControls, goNextPage, pageTag]);

	// Allow PageDown / PageUp shortcut to ease navigation
	useEffect(() => {
		const listener = (e: KeyboardEvent) => {
			let stopPropagation = false;
			if (e.key === 'PageDown') {
				handleGoNext();
				stopPropagation = true;
			}
			if (e.key === 'PageUp') {
				goPreviousPage();
				stopPropagation = true;
			}
			if (stopPropagation) {
				e.preventDefault();
				e.stopPropagation();
			}
		};
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	}, [handleGoNext, goPreviousPage]);

	// Check that the source is valid against the schema
	const errors = useMemo(() => {
		const ajv = new Ajv({
			removeAdditional: true,
			strict: false,
			allErrors: true,
			discriminator: true,
		});
		const validator = ajv.compile(LunaticSchema);
		const isSourceValid = validator(structuredClone(source)); // ajv mutate the object, send a clone
		if (!isSourceValid) {
			return validator.errors;
		}
		return [];
	}, [source]);

	const [tab, setTab] = useState(0);

	const tabs = [
		{
			label: 'Form',
			children: (
				<LunaticComponents
					slots={slots}
					autoFocusKey={pageTag}
					components={components}
					componentProps={() => ({
						errors: errorActive[pageTag],
						disabled: disabled,
						...(readOnly ? { readOnly: true } : {}),
					})}
				/>
			),
		},
		{
			label: 'Data',
			children: <OrchestratorData getData={getData} source={source} />,
		},
		...extraTabs,
	] as TabEntry[];

	if (errors && errors.length > 0) {
		tabs.push({
			label: (
				<>
					Errors{' '}
					<span className="badge badge-xs badge-error text-white">
						{errors.length}
					</span>
				</>
			),
			children: <SchemaValidator errors={errors} />,
		});
	}

	return (
		<Provider>
			<div className="container grid grid-cols-[1fr_300px] gap-4">
				<div>
					<div tabIndex={-1} role="tablist" className="tabs tabs-box mb-4">
						{tabs.map((t, k) => (
							<button
								tabIndex={-1}
								key={k}
								role="tab"
								onClick={() => setTab(k)}
								className={`tab gap-2 ${tab === k ? 'tab-active' : ''}`}
							>
								{t.label}
							</button>
						))}
					</div>
					<div>{tabs[tab].children}</div>
				</div>
				<OrchestratorSidebar
					goPreviousPage={goPreviousPage}
					goNextPage={handleGoNext}
					goToPage={goToPage}
					isLastPage={isLastPage}
					isFirstPage={isFirstPage}
					pageTag={pageTag}
					pager={pager}
					hasPageResponse={hasPageResponse()}
					getMultiMode={props.multiMode ? getMultiMode : null}
					onLogData={() => console.log('Data', getData(true))}
					onLogComponents={() => console.log('Components', components)}
				>
					{showOverview && (
						<OrchestratorOverview overview={overview} goToPage={goToPage} />
					)}
				</OrchestratorSidebar>
				<ReactHotkeys
					key={'alt+enter'}
					keyName={'alt+enter'}
					onKeyDown={handleGoNext}
					filter={() => true}
				/>
				{errorsForModal?.currentErrors && (
					<ModalControls
						errors={errorsForModal.currentErrors}
						goNext={skip}
						onClose={closeModal}
						isCritical={errorsForModal.isCritical}
					/>
				)}
			</div>
		</Provider>
	);
}

function onLogChange(args: unknown) {
	Logger.log('onChange', args);
}

function logMissingStrategy() {
	Logger.log('no missing strategy');
}

export const Orchestrator = memo(OrchestratorForStories);

export const OrchestratorMeta: Meta<typeof Orchestrator> = {
	component: Orchestrator,
	argTypes: {
		// Do not display controls for these args
		source: { table: { disable: true } },
		data: { table: { disable: true } },
		getReferentiel: { table: { disable: true } },
		initialPage: { table: { disable: true } },
		slots: { table: { disable: true } },
		lastReachedPage: { table: { disable: true } },
		autoSuggesterLoading: { table: { disable: true } },
		missingStrategy: { table: { disable: true } },
		extraTabs: { table: { disable: true } },
	},
	args: {
		disableFilters: false,
		disableFiltersDescription: false,
		management: false,
		shortcut: false,
		activeControls: true,
		initialPage: '1',
		missing: false,
		missingStrategy: logMissingStrategy,
		showOverview: false,
		readOnly: false,
		disabled: false,
		detailAlwaysDisplayed: false,
		autoSuggesterLoading: false,
	},
};

export type OrchestratorStory = StoryObj<typeof Orchestrator>;
