const dictionary = {
	DEFAULT_BUTTON_ADD: { fr: 'Ajouter une ligne', en: 'Add row' },
	DEFAULT_BUTTON_REMOVE: { fr: 'Supprimer une ligne', en: 'Remove row' },
	MODAL_IGNORE: { fr: 'Poursuivre', en: 'Ignore' },
	MODAL_CORRECT: { fr: 'Corriger ma réponse', en: 'Correct' },
	DK: { fr: 'Ne sais pas', en: "Don't know" },
	RF: { fr: 'Refus', en: 'Refused' },
} as const;

export default dictionary;
export type Dictionary = typeof dictionary;
export type DictionaryLang = 'fr' | 'en';
