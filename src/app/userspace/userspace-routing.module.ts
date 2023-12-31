import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserspacePage } from './userspace.page';

const routes: Routes = [
  {
    path: '',
    component: UserspacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserspacePageRoutingModule {}
