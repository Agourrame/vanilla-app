import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserspacePageRoutingModule } from './userspace-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { UserspacePage } from './userspace.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserspacePageRoutingModule,
    MatButtonModule
  ],
  declarations: [UserspacePage]
})
export class UserspacePageModule {}
