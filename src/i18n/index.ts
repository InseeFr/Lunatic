import createDictionary, { getLang } from './build-dictionary';
import dictionary, { Dictionary } from './dictionary';
import inputNumberProps, {
	allDecimalSeparators,
	InputNumberPropsI18N,
} from './inputNumberProps';

const D1 = createDictionary<Dictionary>('fr', dictionary);
const D2 = createDictionary<Dictionary>('en', dictionary);

const IN_FR = createDictionary<InputNumberPropsI18N>('fr', inputNumberProps);
const IN_EN = createDictionary<InputNumberPropsI18N>('en', inputNumberProps);

export const inputNumberPropsI18N = {
	...(getLang() === 'fr' ? IN_FR : IN_EN),
	allDecimalSeparators: allDecimalSeparators,
};

export default getLang() === 'fr' ? D1 : D2;
