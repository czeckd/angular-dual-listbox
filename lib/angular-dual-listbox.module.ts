import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DualListComponent } from './dual-list.component';

@NgModule({
	imports:      [
		CommonModule,
		FormsModule
	],
	declarations: [ DualListComponent ],
	exports:      [ DualListComponent ]
})
export class AngularDualListBoxModule {}

