import camelCase from 'lodash.camelcase';

export const buildStyleObject = obj =>
	obj
		? Object.entries(obj).reduce((_, [key, value]) => {
				if (key.startsWith(':')) _[key] = buildStyleObject(value);
				else _[camelCase(key)] = value;
				return _;
		  }, {})
		: {};
