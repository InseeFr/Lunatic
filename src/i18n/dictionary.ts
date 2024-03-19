const dictionary = {
	DEFAULT_BUTTON_ADD: { fr: 'Ajouter une ligne', en: 'Add row' },
	DEFAULT_BUTTON_REMOVE: { fr: 'Supprimer une ligne', en: 'Remove row' },
	MODAL_IGNORE: { fr: 'Poursuivre', en: 'Ignore' },
	MODAL_CORRECT: { fr: 'Corriger ma réponse', en: 'Correct' },
	DK: { fr: 'Ne sais pas', en: "Don't know" },
	RF: { fr: 'Refus', en: 'Refused' },
	PLACEHOLDER: { fr: 'Commencez votre saisie...', en: 'Start typing...' },
	SUGGESTER_LOADING: {
		fr: 'Liste en cours de chargement',
		en: 'List is loading',
	},
	SUGGESTER_NO_RESULT: {
		fr: 'Aucun résultat trouvé',
		en: 'No results',
	},
	SUGGESTER_ERROR: {
		fr: 'Erreur lors du chargement de la liste',
		en: 'An error has occured while loading the list',
	},
	SUGGESTER_ARBITRARY: {
		fr: 'Choisir',
		en: 'Select',
	},
} as const;

export default dictionary;
export type Dictionary = typeof dictionary;
export type DictionaryLang = 'fr' | 'en';

export type Entries<T> = {
	[K in keyof T]: [K, T[K]];
}[keyof T][];

export type AbstractDictionary<T> = {
	[Key in keyof T]: {
		[Lang in DictionaryLang]: string;
	};
};
