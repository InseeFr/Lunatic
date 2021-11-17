import { prepareStringIndexation } from '../../commons-tokenizer';

function queryParserSoft(string) {
	return [prepareStringIndexation(string, '-')];
}

export default queryParserSoft;
