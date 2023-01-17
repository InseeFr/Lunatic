import removeAccents from 'remove-accents';

function preparePrefix(prefix) {
	return typeof prefix === 'string'
		? removeAccents(prefix.toLowerCase()).replace(/[- ']/g, '')
		: prefix;
}

export default preparePrefix;
