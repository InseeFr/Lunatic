import { createDictionary, getLang } from './build-dictionary';
import dictionary from './dictionary';
import inputNumberProps, { allDecimalSeparators } from './inputNumberProps';

const D1 = createDictionary('fr', dictionary);
const D2 = createDictionary('en', dictionary);

const IN_FR = createDictionary('fr', inputNumberProps);
const IN_EN = createDictionary('en', inputNumberProps);

export const inputNumberPropsI18N = {
	...(getLang() === 'fr' ? IN_FR : IN_EN),
	allDecimalSeparators: allDecimalSeparators,
};

export default getLang() === 'fr' ? D1 : D2;
