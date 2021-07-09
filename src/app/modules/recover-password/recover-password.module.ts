import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoverPasswordRoutingModule } from './recover-password-routing.module';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';


@NgModule({
  declarations: [
    RecoverPasswordComponent
  ],
  imports: [
    CommonModule,
    RecoverPasswordRoutingModule
  ]
})
export class RecoverPasswordModule { }
