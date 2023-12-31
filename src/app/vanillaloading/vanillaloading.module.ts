import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VanillaloadingPageRoutingModule } from './vanillaloading-routing.module';

import { VanillaloadingPage } from './vanillaloading.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VanillaloadingPageRoutingModule
  ],
  declarations: [VanillaloadingPage]
})
export class VanillaloadingPageModule {}
