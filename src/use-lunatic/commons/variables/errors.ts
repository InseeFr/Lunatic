export class VTLExpressionError extends Error {
	constructor(
		public readonly expression: string,
		message: string
	) {
		super(`Cannot interpret expression "${expression}" ${message}`);
	}
}

export class VTLInterpretationError extends VTLExpressionError {
	constructor(
		public readonly expression: string,
		public readonly bindings: Record<string, unknown>
	) {
		super(expression, `with bindings ${JSON.stringify(bindings)}`);
	}
}

export class VTLMissingDependency extends VTLExpressionError {
	constructor(
		public readonly expression: string,
		public readonly variableName: string
	) {
		super(expression, `unknown variable ${variableName}`);
	}
}

export class VTLMissingDependencies extends VTLExpressionError {
	constructor(
		public readonly expression: string,
		public readonly dependencies: string[]
	) {
		super(expression, `unknown dependencies ${JSON.stringify(dependencies)}`);
	}
}
