import { describe, it, expect} from "vitest";
import {resizeArray} from "./array";

describe('array', () => {
    describe('resizeArray()', () => {
        it('should append new value', () => {
            expect(resizeArray([1, 2], 3, 3)).toEqual([1, 2, 3])
            expect(resizeArray([1, 2], 4, 3)).toEqual([1, 2, 3, 3])
        })
        it('should remove value', () => {
            expect(resizeArray([1, 2, 3], 1)).toEqual([1])
        })
    })
});
