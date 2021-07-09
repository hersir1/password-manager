import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { RegisterDataSourceService } from './services/register-data-source.service';
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
		RegisterComponent
	],
	imports: [
		CommonModule,
		RegisterRoutingModule,
		ReactiveFormsModule,
		...NgZorroModules
	],
	providers: [
		RegisterDataSourceService
	]
})
export class RegisterModule {
}
