import { prepareStringIndexation } from '../../commons-tokenizer';

function parser(string) {
	return [prepareStringIndexation(string, '-')];
}

export default parser;
