import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { LoginpagePageRoutingModule } from './loginpage-routing.module';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatButtonModule} from '@angular/material/button'
import { LoginpagePage } from './loginpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginpagePageRoutingModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  declarations: [LoginpagePage]
})
export class LoginpagePageModule {}
