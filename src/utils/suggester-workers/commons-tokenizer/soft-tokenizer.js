import { prepareStringIndexation } from '../commons-tokenizer';

function softTokenizer(string) {
	return [prepareStringIndexation(string, '-')];
}

export default softTokenizer;
