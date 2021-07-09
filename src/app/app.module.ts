import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './services/user.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ModalService } from './services/modal.service';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzMessageService } from 'ng-zorro-antd/message';

registerLocaleData(ru);

const NgZorroModules = [
	NzLayoutModule,
	NzMenuModule,
	NzToolTipModule,
	NzIconModule
];

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		...NgZorroModules
	],
	providers: [
		{provide: NZ_I18N, useValue: ru_RU},
		NzModalService,
		AuthGuard,
		UserService,
		ModalService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptor,
			multi: true,
		},
		NzMessageService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
