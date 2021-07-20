import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './components/about/about.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

const NgZorroModules = [
	NzTypographyModule
];

@NgModule({
	declarations: [
		AboutComponent
	],
	imports: [
		CommonModule,
		AboutRoutingModule,
		...NgZorroModules
	]
})
export class AboutModule {
}
