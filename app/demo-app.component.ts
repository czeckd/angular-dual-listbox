import { Component } from '@angular/core';

import { DualListComponent } from './dual-list.component';

@Component({
	selector: 'demo-app',
	template: `
<div class="container-fluid">
	<p></p>
	<dual-list [sort]="keepSorted" [source]="stations" [(destination)]="confirmed" height="265px"></dual-list>
	<div style="margin-top:32px;"><h4>Confirmed</h4><pre>{{confirmed|json}}</pre></div>

<button type="button" class="btn" (click)="add()">hi</button>
</div>

`
})

export class DemoAppComponent {

	private keepSorted:boolean = true;

	private count:number = 1;

	private stations:Array<any> = [
		{ _id: 1, _name: 'Antonito' },
		{ _id: 2, _name: 'Big Horn' },
		{ _id: 3, _name: 'Sublette' },
		{ _id: 4, _name: 'Toltec' },
		{ _id: 5, _name: 'Osier' },
		{ _id: 6, _name: 'Chama' },
		{ _id: 7, _name: 'Monero' },
		{ _id: 8, _name: 'Lumberton' },
		{ _id: 9, _name: 'Duice' },
		{ _id: 10, _name: 'Navajo' },
		{ _id: 11, _name: 'Juanita' },
		{ _id: 12, _name: 'Pagosa Jct' },
		{ _id: 13, _name: 'Carracha' },
		{ _id: 14, _name: 'Arboles' },
		{ _id: 15, _name: 'Allison' },
		{ _id: 16, _name: 'Tiffany' },
		{ _id: 17, _name: 'La Boca' },
		{ _id: 18, _name: 'Ignacio' },
		{ _id: 19, _name: 'Oxford' },
		{ _id: 20, _name: 'Florida' },
		{ _id: 21, _name: 'Bocea' },
		{ _id: 22, _name: 'Carbon Jct' },
		{ _id: 23, _name: 'Durango' },
		{ _id: 24, _name: 'Home Ranch' },
		{ _id: 25, _name: 'Trimble' },
		{ _id: 26, _name: 'Hermosa' },
		{ _id: 27, _name: 'Rockwood' },
		{ _id: 28, _name: 'Tacoma' },
		{ _id: 29, _name: 'Needleton' },
		{ _id: 30, _name: 'Elk Park' },
		{ _id: 31, _name: 'Silverton' },
		{ _id: 32, _name: 'Eureka' }
	 ];

	private confirmed:Array<any> = [
		{ _id: 32, _name: 'Eureka' }
	];


	add() {
console.log(this.count);
		switch(this.count) {
		case 1:
			this.confirmed.push({ _id: 1, _name: 'Antonito'});
			break;
		case 2:
			this.confirmed.push({ _id: 24, _name: 'Home Ranch'});
//			this.confirmed.push({ _id: 34, _name: 'Mojo'});
			break;
		case 3:
			this.confirmed.push({ _id: 5, _name: 'Osier'});
//console.log('x');
//console.log(this.confirmed);
//console.log('^');
			break;
		case 4:
			this.confirmed.push({ _id: 34, _name: 'Mojo'});
			this.count = 0;
			break;
		}
		this.count += 1;
	}

}
