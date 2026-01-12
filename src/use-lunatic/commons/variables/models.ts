/**
 * Represent a point in time (more precise than Date)
 */
export class Timekey {
	private time = performance.now();
	getTime() {
		return this.time;
	}
	touch() {
		this.time = performance.now();
	}
}
