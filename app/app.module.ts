import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { DemoAppComponent } from './demo-app.component';


@NgModule({
	imports:      [ BrowserModule, FormsModule ],
	declarations: [ DemoAppComponent ],
	bootstrap:    [ DemoAppComponent ]
})
export class AppModule { }

