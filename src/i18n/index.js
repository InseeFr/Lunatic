import { createDictionary, getLang } from './build-dictionary';
import dictionary from './dictionary';

const D1 = createDictionary('fr', dictionary);
const D2 = createDictionary('en', dictionary);

export default getLang() === 'fr' ? D1 : D2;
