export class BasicList {
	/** Name of the list */
	private _name: string;
	/** Last element touched */
	last: any;
	/** text filter */
	picker: string;

	dragStart: boolean;
	dragOver: boolean;

	pick: Array<any>;
	list: Array<any>;
	sift: Array<any>;

	constructor(name: string) {
		this._name = name;
		this.last = null;
		this.picker = '';
		this.dragStart = false;
		this.dragOver = false;

		// Arrays will contain objects of { _id, _name }.
		this.pick = [];
		this.list = [];
		this.sift = [];
	}

	get name(): string {
		return this._name;
	}
}
