import { goNext } from '../../pagination';

function reducegoNext(state) {
	const pager = goNext(state);
	return { ...state, pager };
}

export default reducegoNext;
