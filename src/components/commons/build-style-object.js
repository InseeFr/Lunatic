import camelCase from 'lodash.camelcase';

function buildStyleObject(obj) {
	return obj
		? Object.entries(obj).reduce((_, [key, value]) => {
				if (key.startsWith(':')) _[key] = buildStyleObject(value);
				else _[camelCase(key)] = value;
				return _;
		  }, {})
		: {};
}
export default buildStyleObject;
