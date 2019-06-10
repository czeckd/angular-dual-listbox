import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AngularDualListBoxModule } from 'angular-dual-listbox';

import { DemoAppComponent } from './demo-app.component';

@NgModule({
	imports:      [ BrowserModule, FormsModule, AngularDualListBoxModule ],
	declarations: [ DemoAppComponent ],
	bootstrap:    [ DemoAppComponent ]
})
export class AppModule { }

