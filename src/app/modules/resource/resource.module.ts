import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceService } from './services/resource.service';
import { ResourcesDataSourceService } from './services/resources-data-source.service';
import { AddResourceModalComponent } from './components/add-resource-modal/add-resource-modal.component';
import { EditResourceModalComponent } from './components/edit-resource-modal/edit-resource-modal.component';
import { ResourcesListComponent } from './components/resources-list/resources-list.component';
import { ShowPasswordModalComponent } from './components/show-password-modal/show-password-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ResourceRoutingModule } from './resource-routing.module';
import { NzAlertModule } from 'ng-zorro-antd/alert';

const NgZorroModules = [
	NzInputModule,
	NzIconModule,
	NzButtonModule,
	NzTableModule,
	NzEmptyModule,
	NzSpinModule
];

@NgModule({
	declarations: [
		AddResourceModalComponent,
		EditResourceModalComponent,
		ResourcesListComponent,
		ShowPasswordModalComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		ResourceRoutingModule,
		...NgZorroModules,
		NzAlertModule
	],
	providers: [
		ResourceService,
		ResourcesDataSourceService
	]
})
export class ResourceModule {
}
