import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeLogRoutingModule } from './change-log-routing.module';
import { ChangeLogComponent } from './components/change-log/change-log.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

const NgZorroModules = [
	NzDividerModule,
	NzTypographyModule
];

@NgModule({
	declarations: [
		ChangeLogComponent
	],
	imports: [
		CommonModule,
		ChangeLogRoutingModule,
		...NgZorroModules
	]
})
export class ChangeLogModule {
}
