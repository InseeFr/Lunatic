// 1.2.3#1.1 | 1 | 1.2#1

function parseParts(parts) {
	const sub = parts.split('#');

	return sub.reduce(function (a, entry) {
		return [...a, Number.parseInt(entry)];
	}, []);
}

function parsePages(tagParts) {
	if (tagParts.length > 0) {
		return { pages: parseParts(tagParts[0]) };
	}
	return {};
}

function parseIterations(tagParts) {
	if (tagParts.length > 1) {
		return { iterations: parseParts(tagParts[1]) };
	}
	return {};
}

function parsePageTag(tag) {
	const tagParts = tag.split('#');

	return { ...parsePages(tagParts), ...parseIterations(tagParts) };
}

export default parsePageTag;
