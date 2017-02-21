import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkelComponent } from './skel.component';

const routes: Routes = [
  { path: '', component: SkelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkelRoutingModule { }

export const routedComponents = [SkelComponent];
