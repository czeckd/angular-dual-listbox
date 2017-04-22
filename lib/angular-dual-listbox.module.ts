import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DualListComponent } from './dual-list.component';

@NgModule({
	imports:      [ CommonModule ],
	declarations: [ DualListComponent ],
	exports:      [ DualListComponent ]
})
export class AngularDualListBoxModule {}

