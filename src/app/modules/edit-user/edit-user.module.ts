import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditUserRoutingModule } from './edit-user-routing.module';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EditUserDataSourceService } from './services/edit-user-data-source.service';

const NgZorroModules = [
	NzAlertModule,
	NzInputModule,
	NzButtonModule,
	NzIconModule
];

@NgModule({
	declarations: [
		EditUserComponent
	],
	imports: [
		CommonModule,
		EditUserRoutingModule,
		SharedModule,
		ReactiveFormsModule,
		...NgZorroModules
	],
	providers: [
		EditUserDataSourceService
	]
	
})
export class EditUserModule {
}
