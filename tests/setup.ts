// Mock for structuredClone on NodeJS
(global as any).structuredClone = (val: any) => {
	return JSON.parse(JSON.stringify(val));
};
