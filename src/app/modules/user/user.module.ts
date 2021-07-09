import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UserDataSourceService } from './services/user-data-source.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

const NgZorroModules = [
	NzInputModule,
	NzAlertModule,
	NzButtonModule,
	NzIconModule,
	NzDescriptionsModule
];

@NgModule({
	declarations: [
		EditUserComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule,
		...NgZorroModules
	],
	providers: [
		UserDataSourceService
	]
})
export class UserModule {
}
