import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SinuppagePageRoutingModule } from './sinuppage-routing.module';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatButtonModule} from '@angular/material/button'
import { SinuppagePage } from './sinuppage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SinuppagePageRoutingModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  declarations: [SinuppagePage]
})
export class SinuppagePageModule {}
