import { SkelRoutingModule } from './skel.routing';
import { SkelComponent } from './skel.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [SkelRoutingModule],
  exports: [SkelComponent],
  declarations: [SkelComponent],
  providers: [],
})
export class SkelModule { }
