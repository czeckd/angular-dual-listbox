import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange } from '@angular/core';

type compareFunction = (a:any, b:any) => number;

class BasicList {
	private _name:string;
	last:any;

	dragStart:boolean;
	dragOver:boolean;

	pick:Array<any>;
	list:Array<any>;

	constructor(name:string) {
		this._name = name;
		this.last = null;
		this.dragStart = false;
		this.dragOver = false;
		this.pick = new Array<any>();
		this.list = [];
	}

	get name() : string {
		return this._name;
	}
}

@Component({
	selector: 'dual-list',
	template: `
<div style="display:-webkit-box;display:flex;flex-direction:row;align-content:flex-start;">
	<form style="width:50%;margin:0px;">
		<button type="button" name="addBtn" class="btn btn-primary"
			style="display:block;width:100%;margin-bottom:8px;"
			(click)="moveItem(available, confirmed)"
			[disabled]="available.pick.length === 0">Add&nbsp;&nbsp;&nbsp;&nbsp;&#9654;</button>

		<div class="record-picker">
			<ul [ngStyle]="{'max-height': height, 'min-height': height}" [ngClass]="{over:available.dragOver}"
				(drop)="drop($event, confirmed)" (dragover)="allowDrop($event, available)" (dragleave)="dragLeave()">
				<li *ngFor="let item of available.list; let idx=index;"
					(click)="selectItem(available.pick, item); shiftClick($event, idx, available, item)"
					[ngClass]="{selected: isItemSelected(available.pick, item)}"
					draggable="true" (dragstart)="drag($event, item, available)" (dragend)="dragEnd(available)"
				><label>{{item._name}}</label></li>
			</ul>
		</div>

		<div style="margin-top:8px;">
			<button type="button" class="btn btn-primary"
				style="width:47%;float:left;" (click)="selectAll(available)"
				[disabled]="isAllSelected(available)">All</button>
			<button type="button" class="btn btn-default"
				style="width:47%;float:right;margin-right:0px;" (click)="selectNone(available)"
				[disabled]="!isAnySelected(available)">None</button>
		</div>
	</form>

	<form style="width:50%;margin:0 0 0 10px;">
		<button type="button" name="removeBtn" class="btn btn-primary"
			style="display:block;width:100%;margin-bottom:8px;"
			(click)="moveItem(confirmed, available)"
			[disabled]="confirmed.pick.length === 0">&#9664;&nbsp;&nbsp;&nbsp;&nbsp;Remove</button>

		<div class="record-picker">
			<ul [ngStyle]="{'max-height': height, 'min-height': height}" [ngClass]="{over:confirmed.dragOver}"
				(drop)="drop($event, available)" (dragover)="allowDrop($event, confirmed)" (dragleave)="dragLeave()">
				<li *ngFor="let item of confirmed.list; let idx=index;"
					(click)="selectItem(confirmed.pick, item); shiftClick($event, idx, confirmed, item)"
					[ngClass]="{selected: isItemSelected(confirmed.pick, item)}"
					draggable="true" (dragstart)="drag($event, item, confirmed)" (dragend)="dragEnd(confirmed)"
				><label>{{item._name}}</label></li>
			</ul>
		</div>
		<div style="margin-top:8px;">
			<button type="button" class="btn btn-primary"
				style="width:47%;float:left;" (click)="selectAll(confirmed)"
				[disabled]="isAllSelected(confirmed)">All</button>
			<button type="button" class="btn btn-default"
				style="width:47%;float:right;margin-right:0px;" (click)="selectNone(confirmed)"
				[disabled]="!isAnySelected(confirmed)">None</button>
		</div>
	</form>
</div>
`
})

export class DualListComponent implements OnChanges {
	static AVAILABLE_LIST_NAME = 'available';
	static CONFIRMED_LIST_NAME = 'confirmed';

	@Input() key:string = typeof this.key !== 'undefined' ? this.key : '_id';
	@Input() display:string = typeof this.display !== 'undefined' ? this.display : '_name';
	@Input() height:string = typeof this.height !== 'undefined' ? this.height : '100px';
	@Input() sort:boolean = typeof this.sort !== 'undefined' ? this.sort : false;
	@Input() compare:compareFunction = typeof this.compare !== 'undefined' ? this.compare : undefined;
	@Input() source:Array<any>;// = typeof this.source !== 'undefined' ? this.source : [];
	@Input() destination:Array<any>;
	@Output() destinationChange = new EventEmitter();
	private  destinationCache:Array<any>;

	private available:BasicList = new BasicList(DualListComponent.AVAILABLE_LIST_NAME);
	private confirmed:BasicList = new BasicList(DualListComponent.CONFIRMED_LIST_NAME);

	private sorter = (a:any,b:any) => { return (a._name < b._name) ? -1 : ((a._name > b._name) ? 1 : 0); };

	ngOnChanges(changeRecord: {[key:string]:SimpleChange}) {
		if (changeRecord['sort']) {
			if (changeRecord['sort'].currentValue === true && this.compare === undefined) {
				this.compare = this.sorter;
			} else if (changeRecord['sort'].currentValue === false) {
				this.compare = undefined;
			}
		}

		if (changeRecord['source']) {
            this.available = new BasicList(DualListComponent.AVAILABLE_LIST_NAME);
			if (this.source !== undefined) {
				this.source.filter( (e:any) => {
					this.available.list.push( { _id: e[this.key], _name: this.makeName(e) });
					return true;
				});
			}
			if (this.compare !== undefined) {
				this.available.list.sort(this.compare);
			}
		}

		if (changeRecord['destination']) {
			// Slightly delay update to avoid loop.
			setTimeout( () => { this.updateConfirmed(); }, 100);
		}

	}

	dragEnd(list:BasicList = null) {
		if (list) {
			list.dragStart = false;
		} else {
			this.available.dragStart = false;
			this.confirmed.dragStart = false;
		}
		return false;
	}

	drag(event:DragEvent, item:any, list:BasicList) {
		if (!this.isItemSelected(list.pick, item)) {
			this.selectItem(list.pick, item);
		}
		list.dragStart = true;
		event.dataTransfer.setData('text', item[this.key]);
	}

	allowDrop(event:DragEvent, list:BasicList) {
		event.preventDefault();
		if (!list.dragStart) {
			list.dragOver = true;
		}
		return false;
	}

	dragLeave() {
		this.available.dragOver = false;
		this.confirmed.dragOver = false;
	}

	drop(event:DragEvent, list:BasicList) {
		event.preventDefault();
		this.dragLeave();
		this.dragEnd();

		let id = event.dataTransfer.getData('text');

		// Use coercion to filter.
		let mv = list.list.filter( (e:any) => e[this.key] == id );
		if (mv.length > 0) {
			for (let i = 0, len = mv.length; i < len; i += 1) {
				list.pick.push( mv[i] );
			}
		}
		if (list === this.available) {
			this.moveItem(this.available, this.confirmed);
		} else {
			this.moveItem(this.confirmed, this.available);
		}
	}

	trueUp() {

		// Clear removed items.
		let pos = this.destination.length;
		while ((pos -= 1) >= 0) {
			let mv = this.confirmed.list.filter( conf => {
				return conf._id === this.destination[pos][this.key];
			});

			if (mv.length === 0) {
				// Not found so remove.
				this.destination.splice(pos, 1);
			}
		}

		// Push added items.
		for (let i = 0, len = this.confirmed.list.length; i < len; i += 1) {
			let mv = this.destination.filter( (d:any) => { return (d[this.key] === this.confirmed.list[i]._id); });

			if (mv.length === 0) {
				// Not found so add.
				mv = this.source.filter( (o:any) => { return (o[this.key] === this.confirmed.list[i]._id); });

				if (mv.length > 0) {
					this.destination.push(mv[0]);
				}
			}
		}

		this.destinationChange.emit(this.destination);
	}


	updateConfirmed() {
		if (this.destination.length === 0) {
			// Clear the confirmed.
			this.selectAll(this.confirmed);
			this.moveItem(this.confirmed, this.available);
		} else {

			if (this.confirmed.list.length > 0) {
				// See if all the items in confirmed are still in the destination.
				for (let i = 0, len = this.confirmed.list.length; i < len; i += 1) {
					let m = this.destination.filter( (e:any) => {
						return (e[this.key] === this.confirmed.list[i][this.key]);
					});

					// Item not found.
					if (m.length === 0) {
						this.confirmed.pick.push( this.confirmed.list[i] );
					}
				}
			}

			this.destination.filter( (e:any) => {
				this.available.pick.push({ _id: e[this.key], _name: this.makeName(e) });
				return true;
			});

			this.moveItem(this.available, this.confirmed);

			if (this.confirmed.pick.length > 0) {
				this.moveItem(this.confirmed, this.available);
			}
		}

		if (this.compare !== undefined) {
			this.available.list.sort(this.compare);
		}

	}

	moveItem(source:BasicList, target:BasicList, item:any = null) {
		let moved = true;

		if (item) {
			let idx = source.list.indexOf(item);
			if (idx !== -1) {
				source.list.splice(idx, 1);
			}

			// Was the item actually moved to the target?
			let mv = target.list.filter( e => {
				return (e[this.key] === item[this.key]);
			});

			if (mv.length === 0) {
				moved = false;
			}
		}

		if (moved) {
			for (let i = 0, len = source.pick.length; i < len; i += 1) {
				// Is the pick still in list?
				let mv = source.list.filter( src => {
					return (src[this.key] === source.pick[i][this.key]);
				});

				// Should only ever be 1
				if (mv.length === 1) {
					// Move if item wasn't already moved by dnd-list.
					if (item && item[this.key] === mv[0][this.key]) {
						target.list.push( mv[0] );
					} else {
						// see if it is already in target?
						if ( target.list.filter( trg => { return trg[this.key] === mv[0][this.key]; }).length === 0) {
							target.list.push( mv[0] );
						}
					}

					// Make unavailable.
					let idx = source.list.indexOf( mv[0] );
					if (idx !== -1) {
						source.list.splice(idx, 1);
					}
				}
			}

			if (this.compare !== undefined) {
				target.list.sort(this.compare);
			}

			source.pick.length = 0;

			// Update destination
			this.trueUp();
		}
	}


	isItemSelected(list:Array<any>, item:any) {
		if (list.filter( e => { return Object.is(e, item); }).length > 0) {
			return true;
		}
		return false;
	}

	shiftClick(event:MouseEvent, index:number, source:BasicList, item:any) {
		if (event.shiftKey && source.last && !Object.is(item, source.last)) {
			let idx = source.list.indexOf(source.last);
			if (index > idx) {
				for (let i = (idx + 1); i < index; i += 1) {
					this.selectItem(source.pick, source.list[i]);
				}
			} else if (idx !== -1) {
				for (let i = (index + 1); i < idx; i += 1)  {
					this.selectItem(source.pick, source.list[i]);
				}
			}
		}
		source.last = item;
	}

	selectItem(list:any, item:any) {
		let pk = list.filter( (e:any) => { return Object.is(e, item); });
		if (pk.length > 0) {
			// Already in list, so deselect.
			for (let i = 0, len = pk.length; i < len; i += 1) {
				let idx = list.indexOf(pk[i]);
				if (idx !== -1) {
					list.splice(idx, 1);
				}
			}
		} else {
			list.push(item);
		}
	}

	selectAll(source:BasicList) {
		source.pick.length = 0;
		source.pick = source.list.slice(0);
	}

	selectNone(source:BasicList) {
		source.pick.length = 0;
	}

	isAllSelected(source:BasicList) {
		if (source.list.length === 0 || source.list.length === source.pick.length) {
			return true;
		}
		return false;
	}

	isAnySelected(source:BasicList) {
		if (source.pick.length > 0) {
			return true;
		}
		return false;
	}

	makeName(item:any) : string {
		let str = '';

		if (this.display !== undefined) {
			if (Object.prototype.toString.call( this.display ) === '[object Array]' ) {

				for (let i = 0; i < this.display.length; i += 1) {
					if (str.length > 0) {
						str = str + '_';
					}

					if (this.display[i].indexOf('.') === -1) {
						// Simple, just add to string.
						str = str + item[this.display[i]];

					} else {
						// Complex, some action needs to be performed
						let parts = this.display[i].split('.');

						let s = item[parts[0]];
						if (s) {
							// Use brute force
							if (parts[1].indexOf('substring') !== -1) {
								let nums = (parts[1].substring(parts[1].indexOf('(')+1, parts[1].indexOf(')'))).split(',');

								switch (nums.length) {
								case 1:
									str = str + s.substring(parseInt(nums[0], 10));
									break;
								case 2:
									str = str + s.substring(parseInt(nums[0], 10), parseInt(nums[1], 10));
									break;
								default:
									str = str + s;
									break;
								}
							} else {
								// method not approved, so just add s.
								str = str + s;
							}
						}
					}
				}
				return str;
			} else {
				return item[this.display];
			}
		}

		switch (Object.prototype.toString.call(item)) {
		case '[object Number]':
			return item;
		case '[object String]':
			return item;
		default:
			if (item !== undefined) {
				return item[this.display];
			}
		}
	}
}
