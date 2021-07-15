import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeLogRoutingModule } from './change-log-routing.module';
import { ChangeLogComponent } from './components/change-log/change-log.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';


@NgModule({
  declarations: [
    ChangeLogComponent
  ],
	imports: [
		CommonModule,
		ChangeLogRoutingModule,
		NzDividerModule
	]
})
export class ChangeLogModule { }
