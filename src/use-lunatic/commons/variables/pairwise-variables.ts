/*
Global variables are created when a pairwise component is present.

They can be used when creating the survey, so that filters can be made without
needing to make complex formula.

Note: to work, the first person defined in the pairwise source should be the
respondent.
*/

import { ComponentDefinitionBaseWithResponse } from '../../../type.source';
import { LunaticSource } from '../../type';

/** Name of the first parent defined in the pairwise component. */
const GLOBAL_PARENT1_NAME = 'GLOBAL_PARENT1_PRENOM';
/** Gender of the first parent defined in the pairwise component. */
const GLOBAL_PARENT1_GENDER = 'GLOBAL_PARENT1_SEXE';
/** Name of the second parent defined in the pairwise component. */
const GLOBAL_PARENT2_NAME = 'GLOBAL_PARENT2_PRENOM';
/** Gender of the second parent defined in the pairwise component. */
const GLOBAL_PARENT2_GENDER = 'GLOBAL_PARENT2_SEXE';
/** Name of the partner defined in the pairwise component. */
const GLOBAL_PARTNER_NAME = 'GLOBAL_CONJOINT_PRENOM';
/** Name of the children defined in the pairwise component. */
const GLOBAL_CHILDREN_NAMES = 'GLOBAL_ENFANTS_PRENOMS';

enum linkType {
	partner = '1',
	parent = '2',
	child = '3',
}

/**
 * Manually setup the available pairwise global variables thanks to known
 * business rules.
 */
export function computePairwiseGlobalVariables(source: LunaticSource): {
	name: string;
	dependencies: string[];
	globalDependencies: Map<string, string>;
}[] {
	for (const component of source.components) {
		// There is only one pairwise component so we stop at the first one we find.
		if (component.componentType === 'PairwiseLinks') {
			const pairwiseVariable = (
				component.components[0] as ComponentDefinitionBaseWithResponse
			).response.name;
			const nameSourceVariable = component.sourceVariables?.name;
			const genderSourceVariable = component.sourceVariables?.gender;

			const variables = [];
			if (nameSourceVariable) {
				const globalDependencies = new Map();
				globalDependencies.set('pairwiseVariable', pairwiseVariable);
				globalDependencies.set('pairwiseNameVariable', nameSourceVariable);
				const dependencies = [pairwiseVariable, nameSourceVariable];
				variables.push(
					{ name: GLOBAL_PARENT1_NAME, dependencies, globalDependencies },
					{ name: GLOBAL_PARENT2_NAME, dependencies, globalDependencies },
					{ name: GLOBAL_PARTNER_NAME, dependencies, globalDependencies },
					{ name: GLOBAL_CHILDREN_NAMES, dependencies, globalDependencies }
				);
			}

			if (genderSourceVariable) {
				const globalDependencies = new Map();
				globalDependencies.set('pairwiseVariable', pairwiseVariable);
				globalDependencies.set('pairwiseGenderVariable', genderSourceVariable);
				const dependencies = [pairwiseVariable, genderSourceVariable];
				variables.push(
					{ name: GLOBAL_PARENT1_GENDER, dependencies, globalDependencies },
					{ name: GLOBAL_PARENT2_GENDER, dependencies, globalDependencies }
				);
			}

			return variables;
		}
	}

	// There is no pairwise component
	return [];
}

/** Compute the value of the pairwise global variable. */
export function computePairwiseGlobalVariableValue(
	variableName: string,
	{
		genders = [],
		links = [[]],
		names = [],
	}: { genders?: string[]; links: string[][]; names?: string[] }
) {
	switch (variableName) {
		case GLOBAL_PARENT1_NAME:
			return computeParent1NameValue(links, names);
		case GLOBAL_PARENT1_GENDER:
			return computeParent1GenderValue(links, genders);
		case GLOBAL_PARENT2_NAME:
			return computeParent2NameValue(links, names);
		case GLOBAL_PARENT2_GENDER:
			return computeParent2GenderValue(links, genders);
		case GLOBAL_PARTNER_NAME:
			return computePartnerNameValue(links, names);
		case GLOBAL_CHILDREN_NAMES:
			return computeChildrenNamesValue(links, names);
		default:
			return undefined;
	}
}

/** Get the index of the first parent found in pairwise links. */
function getFirstParentIndex(links: string[][]): number {
	return links[0].indexOf(linkType.parent);
}

/** Get the index of the second parent found in pairwise links. */
function getSecondParentIndex(links: string[][]): number {
	const firstParentIdx = links[0].indexOf(linkType.parent);
	return links[0].indexOf(linkType.parent, firstParentIdx + 1);
}

/** Get the index of the first partner found in pairwise links. */
function getPartnerIndex(links: string[][]): number {
	return links[0].indexOf(linkType.partner);
}

function computeParent1NameValue(links: string[][], names: string[]) {
	const idx = getFirstParentIndex(links);
	return idx === -1 ? undefined : names[idx];
}

function computeParent1GenderValue(links: string[][], genders: string[]) {
	const idx = getFirstParentIndex(links);
	return idx === -1 ? undefined : genders[idx];
}

function computeParent2NameValue(links: string[][], names: string[]) {
	const idx = getSecondParentIndex(links);
	return idx === -1 ? undefined : names[idx];
}

function computeParent2GenderValue(links: string[][], genders: string[]) {
	const idx = getSecondParentIndex(links);
	return idx === -1 ? undefined : genders[idx];
}

function computePartnerNameValue(links: string[][], names: string[]) {
	const idx = getPartnerIndex(links);
	return idx === -1 ? undefined : names[idx];
}

function computeChildrenNamesValue(links: string[][], names: string[]) {
	const res = [];
	for (let i = 0; i < links[0].length; i++) {
		if (links[0][i] === linkType.child) {
			res.push(names[i]);
		}
	}
	return res.length > 0 ? res.join(';') : undefined;
}
