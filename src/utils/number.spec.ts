import {expect, describe, it} from "vitest";
import {between} from "./number";

describe('between', () => {
    it('should work', () => {
        expect(between(0, -5, 100)).toBe(0)
        expect(between(1000, -5, 100)).toBe(100)
        expect(between(-23.22, -5, 100)).toBe(-5)
    })
});
