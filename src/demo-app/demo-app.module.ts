import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { DemoAppComponent } from './demo-app.component';
import { DemoAppRoutingModule } from './demo-app.routing';

import { SkelModule } from '@company/skel'

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    SkelModule,
    DemoAppRoutingModule,
  ],
  declarations: [
    DemoAppComponent
  ],
  providers: [
  ],
  bootstrap: [
    DemoAppComponent
  ],
})
export class DemoAppModule { }
