declare module './data*.json' {
	import type { LunaticData } from './use-lunatic/type';
	const value: LunaticData;
	export default value;
}

declare module '*-schema.json' {
	const value: any;
	export default value;
}

declare module '*.json' {
	import type { LunaticSource } from './type.source';
	const value: LunaticSource;
	export default value;
}
