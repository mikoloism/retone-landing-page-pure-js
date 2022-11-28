export class Range {
	private minimum: number = 0;
	private maximum: number = 1;

	public includes(length: number): boolean {
		return length < this.getMaximum() && length > this.getMinimum();
	}

	public getMinimum(): number {
		return this.minimum;
	}

	public getMaximum(): number {
		return this.maximum;
	}
}
