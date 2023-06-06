/**
 * Les labels peuvent être des chaines des caractères ou des fragments JSX issus
 * du composant de transformation Markdown (voir components/commons/components/md-label).
 * A l'issu de cette fonction, celle demeurre la valeur textuelle du label.
 * @param {*} label
 * @returns une chaine de caractère
 */
function getLabel(label: unknown): string {
	if (label && typeof label === 'object' && 'props' in label) {
		const { props } = label;
		const { expression } = props as Record<string, string>;
		return `${expression}`;
	}

	return `${label}`;
}

export default getLabel;
