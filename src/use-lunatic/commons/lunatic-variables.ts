import { VtlLexer } from '@inseefr/vtl-2.0-antlr-tools';
import antlr4 from 'antlr4';
import { interpret } from '@inseefr/trevas';

// Interpret counter, used for testing purpose
let interpretCount = 0;

export class LunaticVariables {
	private dictionary = new Map<string, LunaticVariable>();

	constructor() {
		interpretCount = 0;
	}

	/**
	 * Retrieve variable value
	 */
	public get<T>(name: string) {
		if (!this.dictionary.has(name)) {
			return undefined;
		}
		return this.dictionary.get(name)!.getValue() as T;
	}

	/**
	 * Set variable value
	 */
	public set(name: string, value: unknown): LunaticVariable {
		if (!this.dictionary.has(name)) {
			this.dictionary.set(name, new LunaticVariable());
		}
		const variable = this.dictionary.get(name)!;
		variable.setValue(value);
		return variable;
	}

	/**
	 * Register calculated variable
	 */
	public setCalculated(
		name: string,
		expression: string,
		dependencies?: string[]
	): LunaticVariable {
		if (this.dictionary.has(name)) {
			return this.dictionary.get(name)!;
		}
		const variable = new LunaticVariable({
			expression: expression,
			dictionary: this.dictionary,
			dependencies: dependencies,
		});
		this.dictionary.set(name, variable);
		return variable;
	}

	public run(expression: string): unknown {
		return this.setCalculated(expression, expression).getValue();
	}

	// Retrieve the number of interpret() run, used in testing
	get interpretCount() {
		return interpretCount;
	}
}

class LunaticVariable {
	// Last time the value was updated (changed)
	public updatedAt = 0;
	// Last time "calculation" was run (for calculated variable)
	private calculatedAt = 0;
	// Internal value for the variable
	private value: unknown;
	// List of dependencies, ex: ['FIRSTNAME', 'LASTNAME']
	private dependencies?: string[];
	// Expression for calculated variable
	private readonly expression?: string;
	// Dictionnary holding all the available variables
	private readonly dictionary?: Map<string, LunaticVariable>;

	constructor(
		args: {
			expression?: string;
			dependencies?: string[];
			dictionary?: Map<string, LunaticVariable>;
		} = {}
	) {
		const { expression, dictionary, dependencies } = args;
		if (expression && !dictionary) {
			throw new Error(
				`A calculated variable needs a dictionary to retrieve his deps`
			);
		}
		this.expression = expression;
		this.dictionary = dictionary;
		this.dependencies = dependencies;
	}

	getValue(): unknown {
		// The variable is not calculated
		if (!this.expression) {
			return this.value;
		}
		// Calculate bindings first to refresh "updatedAt" on calculated dependencies
		const bindings = this.getDependenciesValues();
		if (!this.isOutdated()) {
			return this.value;
		}
		if ((import.meta as any).env.MODE === 'test') {
			interpretCount++;
		}
		// Remember the value
		this.setValue(interpret(this.expression, bindings));
		this.calculatedAt = performance.now();
		return this.value;
	}

	setValue(v: unknown) {
		if (v === this.value) {
			return;
		}
		this.value = v;
		this.updatedAt = performance.now();
	}

	private getDependencies(): string[] {
		// Calculate dependencies from expression on the fly if necessary
		if (this.dependencies === undefined) {
			this.dependencies = getExpressionVariables(this.expression!);
		}
		return this.dependencies;
	}

	private getDependenciesValues(): Record<string, unknown> {
		return Object.fromEntries(
			this.getDependencies().map((dep) => [
				dep,
				this.dictionary?.get(dep)?.getValue(),
			])
		);
	}

	private isOutdated(): boolean {
		const dependenciesUpdatedAt = Math.max(
			...this.getDependencies().map(
				(dep) => this.dictionary?.get(dep)?.updatedAt ?? 0
			)
		);
		return dependenciesUpdatedAt > this.calculatedAt;
	}
}

/**
 * Find variables used in an expression
 */
function getExpressionVariables(expression: string): string[] {
	try {
		const chars = new antlr4.InputStream(expression);
		const lexer = new VtlLexer(chars);
		const dependencySet = lexer
			.getAllTokens()
			.reduce(function (acc, { start, stop, type }) {
				if (type === 234) {
					acc.add(expression.substring(start, stop + 1));
				}
				return acc;
			}, new Set<string>());
		return Array.from(dependencySet);
	} catch (e) {
		return [];
	}
}
