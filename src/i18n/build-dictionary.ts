import { Dictionary, DictionaryLang } from './dictionary';

/**
 * Based on the locale passed as a paremeter, this function will return
 * the corresponding dictionary.
 *
 * @param {string} lang the lang of the user
 * @param {any} dict
 */
export const createDictionary = (lang: DictionaryLang, dict: Dictionary) =>
	Object.entries(dict).reduce((acc, [k, v]) => {
		return {
			...acc,
			[k]: v[lang],
		};
	}, {}) as Record<keyof Dictionary, string>;

/**
 * This function will return only the lang part of a locale
 * For example, with fr-FR, will return fr
 * If the lang is not fr, will return en
 * @param {string} lang the lang of the user
 */

export const firstLang = 'fr';
export const secondLang = 'en';

/**
 * Return the current lang based of the settings of the browser
 *
 * @param {String=} defaultLang
 * @returns {String}
 */
export const getLang = (): DictionaryLang =>
	navigator.language.split('-')[0] === firstLang ? firstLang : secondLang;
