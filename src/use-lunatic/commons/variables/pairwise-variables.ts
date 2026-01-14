/*
Global variables that are created when a pairwise component is present.

They can be used when creating the survey, so that filters can be made without
needing to make complex formula.
*/

import { ComponentDefinitionBaseWithResponse } from '../../../type.source';
import { LunaticSource } from '../../type';
import { getPairwiseComponent } from '../component';
import { LunaticVariable } from './lunatic-variables-store';
import { IterationLevel } from './models';

/** Name of the first parent defined in the pairwise component. */
const GLOBAL_PARENT1_NAME = 'GLOBAL_PARENT1_PRENOM';
/**
 * Gender of the first parent defined in the pairwise component:
 * `"1"` = man, `"2"` = woman.
 */
const GLOBAL_PARENT1_GENDER = 'GLOBAL_PARENT1_SEXE';
/** Name of the second parent defined in the pairwise component. */
const GLOBAL_PARENT2_NAME = 'GLOBAL_PARENT2_PRENOM';
/**
 * Gender of the second parent defined in the pairwise component:
 * `"1"` = man, `"2"` = woman.
 */
const GLOBAL_PARENT2_GENDER = 'GLOBAL_PARENT2_SEXE';
/** Name of the partner defined in the pairwise component. */
const GLOBAL_PARTNER_NAME = 'GLOBAL_CONJOINT_PRENOM';
/**
 * Names of the children defined in the pairwise component: the format is a
 * string with ";" separating them.
 */
const GLOBAL_CHILDREN_NAMES = 'GLOBAL_ENFANTS_PRENOMS';

/**
 * Pairwise links are defined by fixed values which represent a specific
 * relationship type.
 */
enum LinkType {
	Partner = '1',
	Parent = '2',
	Child = '3',
}

/** Key used by the global dependencies map to store specific dependency. */
export enum PairwiseGlobalDependency {
	Links,
	Name,
	Gender,
}

/**
 * Manually setup the available pairwise global variables thanks to known
 * business rules.
 *
 * The variables information (necessary for the setup) are only returned if
 * there is a pairwise component in the provided source.
 */
export function computePairwiseGlobalVariables(source: LunaticSource): {
	name: string;
	dependencies: string[];
	globalDependencies: Map<PairwiseGlobalDependency, string>;
	shapeFrom?: string;
}[] {
	const component = getPairwiseComponent(source.components);

	// There is not pairwise component, no need to initialize the variables.
	if (!component) return [];

	const variables = [];

	const pairwiseVariable = (
		component.components[0] as ComponentDefinitionBaseWithResponse
	).response.name;
	const nameSourceVariable = component.sourceVariables?.name;
	const genderSourceVariable = component.sourceVariables?.gender;

	// Setup variables associated to the name.
	if (nameSourceVariable) {
		const globalDependencies = new Map();
		globalDependencies.set(PairwiseGlobalDependency.Links, pairwiseVariable);
		globalDependencies.set(PairwiseGlobalDependency.Name, nameSourceVariable);
		const dependencies = [pairwiseVariable, nameSourceVariable];
		variables.push(
			{
				name: GLOBAL_PARENT1_NAME,
				dependencies,
				globalDependencies,
				shapeFrom: nameSourceVariable,
			},
			{
				name: GLOBAL_PARENT2_NAME,
				dependencies,
				globalDependencies,
				shapeFrom: nameSourceVariable,
			},
			{
				name: GLOBAL_PARTNER_NAME,
				dependencies,
				globalDependencies,
				shapeFrom: nameSourceVariable,
			},
			{
				name: GLOBAL_CHILDREN_NAMES,
				dependencies,
				globalDependencies,
				shapeFrom: nameSourceVariable,
			}
		);
	}

	// Setup variables associated to the gender.
	if (genderSourceVariable) {
		const globalDependencies = new Map();
		globalDependencies.set(PairwiseGlobalDependency.Links, pairwiseVariable);
		globalDependencies.set(
			PairwiseGlobalDependency.Gender,
			genderSourceVariable
		);
		const dependencies = [pairwiseVariable, genderSourceVariable];
		variables.push(
			{
				name: GLOBAL_PARENT1_GENDER,
				dependencies,
				globalDependencies,
				shapeFrom: nameSourceVariable,
			},
			{
				name: GLOBAL_PARENT2_GENDER,
				dependencies,
				globalDependencies,
				shapeFrom: nameSourceVariable,
			}
		);
	}

	return variables;
}

/**
 * Compute the value of the pairwise global variable.
 *
 * It the variable name does not exist or if the value does not exist, it will
 * return undefined.
 */
export function computePairwiseGlobalVariableValue(
	variableName: string,
	iteration: IterationLevel,
	globalDependencies: Map<PairwiseGlobalDependency, string>,
	dictionary: Map<string, LunaticVariable>
): string | undefined {
	// Get the values of the global dependencies we need
	// (i.e. they exist in the map)
	const linksVar = globalDependencies.get(PairwiseGlobalDependency.Links);
	const links = linksVar ? dictionary?.get(linksVar)?.getValue() : [[]];

	const namesVar = globalDependencies.get(PairwiseGlobalDependency.Name);
	const names = namesVar ? dictionary?.get(namesVar)?.getValue() : [];

	const gendersVar = globalDependencies.get(PairwiseGlobalDependency.Gender);
	const genders = gendersVar ? dictionary?.get(gendersVar)?.getValue() : [];

	return computeVariableValue(variableName, iteration, {
		genders: genders as string[],
		links: links as string[][],
		names: names as string[],
	});
}

/** Compute the value of the pairwise global variable. */
function computeVariableValue(
	variableName: string,
	iteration: IterationLevel,
	{
		genders = [],
		links = [[]],
		names = [],
	}: { genders?: string[]; links: string[][]; names?: string[] }
): string | undefined {
	const idx = Array.isArray(iteration) ? iteration[0] : iteration;
	const currentLinks = links[idx];

	switch (variableName) {
		case GLOBAL_PARENT1_NAME:
			return computeParent1NameValue(currentLinks, names);
		case GLOBAL_PARENT1_GENDER:
			return computeParent1GenderValue(currentLinks, genders);
		case GLOBAL_PARENT2_NAME:
			return computeParent2NameValue(currentLinks, names);
		case GLOBAL_PARENT2_GENDER:
			return computeParent2GenderValue(currentLinks, genders);
		case GLOBAL_PARTNER_NAME:
			return computePartnerNameValue(currentLinks, names);
		case GLOBAL_CHILDREN_NAMES:
			return computeChildrenNamesValue(currentLinks, names);
		default:
			return undefined;
	}
}

/** Get the index of the first parent found in pairwise links. */
function getFirstParentIndex(links: string[]): number {
	return links.indexOf(LinkType.Parent);
}

/** Get the index of the second parent found in pairwise links. */
function getSecondParentIndex(links: string[]): number {
	const firstParentIdx = links.indexOf(LinkType.Parent);
	return links.indexOf(LinkType.Parent, firstParentIdx + 1);
}

/** Get the index of the first partner found in pairwise links. */
function getPartnerIndex(links: string[]): number {
	return links.indexOf(LinkType.Partner);
}

function computeParent1NameValue(links: string[], names: string[]) {
	const idx = getFirstParentIndex(links);
	return idx === -1 ? undefined : names[idx];
}

function computeParent1GenderValue(links: string[], genders: string[]) {
	const idx = getFirstParentIndex(links);
	return idx === -1 ? undefined : genders[idx];
}

function computeParent2NameValue(links: string[], names: string[]) {
	const idx = getSecondParentIndex(links);
	return idx === -1 ? undefined : names[idx];
}

function computeParent2GenderValue(links: string[], genders: string[]) {
	const idx = getSecondParentIndex(links);
	return idx === -1 ? undefined : genders[idx];
}

function computePartnerNameValue(links: string[], names: string[]) {
	const idx = getPartnerIndex(links);
	return idx === -1 ? undefined : names[idx];
}

function computeChildrenNamesValue(links: string[], names: string[]) {
	const res = [];
	for (let i = 0; i < links.length; i++) {
		if (links[i] === LinkType.Child) {
			res.push(names[i]);
		}
	}
	return res.length > 0 ? res.join(';') : undefined;
}
