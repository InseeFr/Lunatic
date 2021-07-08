import { useContext } from 'react';
import SuggesterContext from './suggester-context';

function useDispatch() {
	const context = useContext(SuggesterContext);
	const dispatch = context[1];

	return dispatch;
}

export default useDispatch;
