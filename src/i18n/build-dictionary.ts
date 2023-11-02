import {
	type AbstractDictionary,
	type DictionaryLang,
	type Entries,
} from './dictionary';

/**
 * Based on the locale passed as a paremeter, this function will return
 * the corresponding dictionary.
 *
 * @param {string} lang the lang of the user
 * @param {any} dict
 */

function createDictionary<T>(
	lang: DictionaryLang,
	dict: AbstractDictionary<T>
) {
	return (Object.entries(dict) as Entries<AbstractDictionary<T>>).reduce(
		(acc, [k, v]) => {
			return {
				...acc,
				[k]: v[lang],
			};
		},
		{}
	) as Record<keyof AbstractDictionary<T>, string>;
}

export default createDictionary;
/**
 * This function will return only the lang part of a locale
 * For example, with fr-FR, will return fr
 * If the lang is not fr, will return en
 * @param {string} lang the lang of the user
 */

export const supportedLanguages: DictionaryLang[] = ['en', 'fr'];

/**
 * Return the current lang based of the settings of the browser
 *
 * @param {String=} defaultLang
 * @returns {String}
 */
export const getLang = (): DictionaryLang => {
	const currentLanguage = navigator.language.split('-')[0];
	const index = supportedLanguages
		.map((lang) => lang.toString())
		.indexOf(currentLanguage);
	return index === -1 ? supportedLanguages[0] : supportedLanguages[index];
};
