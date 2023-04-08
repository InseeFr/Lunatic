import removeAccents from 'remove-accents';

function preparePrefix(prefix: unknown): string {
	if (typeof prefix === 'string') {
		return removeAccents(prefix.toLowerCase()).replace(/[- ']/g, '');
	}
	return '';
}

export default preparePrefix;
