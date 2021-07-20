import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';

const NgZorroModules = [
	NzSpinModule
];

@NgModule({
	declarations: [
		LoadingComponent
	],
	exports: [
		LoadingComponent
	],
	imports: [
		CommonModule,
		...NgZorroModules
	]
})
export class SharedModule {
}
