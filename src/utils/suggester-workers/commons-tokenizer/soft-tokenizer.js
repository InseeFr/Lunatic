import prepareStringIndexation from './prepare-string-indexation';

function softTokenizer(string) {
	return [prepareStringIndexation(string, '-')];
}

export default softTokenizer;
