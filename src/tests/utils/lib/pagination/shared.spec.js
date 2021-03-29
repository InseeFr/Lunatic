import { splitPage } from 'utils/lib';

describe('string utils', () => {
	describe('splitPage', () => {
		it('should return splitted pages without depth', () => {
			const {
				currentRootPage,
				currentComponentIndex,
				currentIteration,
				currentPageWithoutAnyIteration,
			} = splitPage('1.2#3.10#1');
			expect(currentRootPage).toEqual('1.2#3');
			expect(currentComponentIndex).toEqual(10);
			expect(currentIteration).toEqual(1);
			expect(currentPageWithoutAnyIteration).toEqual('1.2.10');
		});
		it('should return splitted pages with depth 1', () => {
			const {
				currentRootPage,
				currentComponentIndex,
				currentIteration,
				currentPageWithoutAnyIteration,
			} = splitPage('1.2#3.10#1', 1);
			expect(currentRootPage).toEqual('1');
			expect(currentComponentIndex).toEqual(2);
			expect(currentIteration).toEqual(3);
			expect(currentPageWithoutAnyIteration).toEqual('1.2');
		});
		it('should return splitted pages with depth 2', () => {
			const {
				currentRootPage,
				currentComponentIndex,
				currentIteration,
				currentPageWithoutAnyIteration,
			} = splitPage('1.2#3.10#1', 2);
			expect(currentRootPage).toEqual('1.2#3');
			expect(currentComponentIndex).toEqual(10);
			expect(currentIteration).toEqual(1);
			expect(currentPageWithoutAnyIteration).toEqual('1.2.10');
		});
	});
});
