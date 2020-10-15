import { useEffect, useRef } from 'react';

export { titleDecorator } from './decorator';
export * from './prop-types';
export * from './tooltip';
export { getAlphabet } from './alphabet';
export * from './label-position';
export * from './options-positioning';
export * from './responses';
export { buildStyleObject } from './style';
export * from './table';
export * from './loops';
export * from './memo-check';
export * from './checkbox';

export function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}
