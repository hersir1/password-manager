import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataSourceService } from './services/user-data-source.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../shared/shared.module';

const NgZorroModules = [
	NzButtonModule,
	NzIconModule,
	NzDescriptionsModule
];

@NgModule({
	declarations: [
		UserInfoComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterModule,
		UserRoutingModule,
		SharedModule,
		...NgZorroModules
	],
	providers: [
		UserDataSourceService
	]
})
export class UserModule {
}
