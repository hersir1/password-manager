import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginDataSourceService } from './services/login-data-source.service';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

const NgZorroModules = [
	NzInputModule,
	NzAlertModule,
	NzButtonModule,
	NzIconModule
];

@NgModule({
	declarations: [
		LoginComponent
	],
	imports: [
		CommonModule,
		LoginRoutingModule,
		ReactiveFormsModule,
		...NgZorroModules
	],
	providers: [
		LoginDataSourceService
	]
})
export class LoginModule {
}
