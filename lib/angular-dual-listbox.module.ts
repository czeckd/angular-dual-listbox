import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DualListComponent } from './dual-list.component';

@NgModule({
	imports:      [
		CommonModule,
		FormsModule,
		NgbModule
	],
	declarations: [ DualListComponent ],
	exports:      [ DualListComponent ]
})
export class AngularDualListBoxModule {}

