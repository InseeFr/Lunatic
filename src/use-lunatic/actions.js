export const GO_PREVIOUS_PAGE = 'use-lunatic/go-previous';
export const goPreviousPage = () => ({ type: GO_PREVIOUS_PAGE });

export const GO_NEXT_PAGE = 'use-lunatic/go-next';
export const goNextPage = ({ block }) => ({
	type: GO_NEXT_PAGE,
	payload: { block },
});

export const GO_TO_PAGE = 'use-lunatic/go-to-page';
export const goToPage = ({ page }) => ({
	type: GO_TO_PAGE,
	payload: { page },
});

export const ON_INIT = 'use-lunatic/on-init';
export const onInit = ({
	data,
	source,
	initialPage,
	features,
	preferences,
	savingType,
	management,
	handleChange,
	activeControls,
	withOverview,
}) => ({
	type: ON_INIT,
	payload: {
		data,
		source,
		initialPage,
		features,
		preferences,
		savingType,
		management,
		handleChange,
		activeControls,
		withOverview,
	},
});

export const HANDLE_CHANGE = 'use-lunatic/handle-change';
export const handleChange = (response, value, args) => ({
	type: HANDLE_CHANGE,
	payload: { response, value, args },
});

export const ON_SET_WAITING = 'use-lunatic/on-set-waiting';
export const onSetWaiting = (status) => ({
	type: ON_SET_WAITING,
	payload: { status },
});
