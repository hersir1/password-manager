import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NZ_I18N, ru_RU} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import ru from '@angular/common/locales/ru';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzIconModule} from "ng-zorro-antd/icon";
import {ResourcesListComponent} from './components/resources-list/resources-list.component';
import {AddResourceModalComponent} from './components/add-resource-modal/add-resource-modal.component';
import {EditResourceModalComponent} from './components/edit-resource-modal/edit-resource-modal.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzEmptyModule} from "ng-zorro-antd/empty";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import { ShowPasswordModalComponent } from './components/show-password-modal/show-password-modal.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';

registerLocaleData(ru);

@NgModule({
	declarations: [
		AppComponent,
		ResourcesListComponent,
		AddResourceModalComponent,
		EditResourceModalComponent,
  ShowPasswordModalComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		NzLayoutModule,
		NzMenuModule,
		NzToolTipModule,
		NzIconModule,
		NzTableModule,
		NzEmptyModule,
		NzButtonModule,
		NzDropDownModule,
		NzInputModule,
		NzFormModule,
		ReactiveFormsModule,
		NzSpinModule
	],
	providers: [
		{provide: NZ_I18N, useValue: ru_RU},
		NzModalService,
		NzMessageService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
