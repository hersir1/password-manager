import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesDataSourceService } from '../../services/resources-data-source.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

import { finalize } from 'rxjs/operators';

@Component({
	selector: 'app-add-resource-modal',
	templateUrl: './add-resource-modal.component.html',
	styleUrls: ['./add-resource-modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddResourceModalComponent {
	
	form: FormGroup;
	passwordVisible: boolean = false;
	
	constructor(
		private formBuilder: FormBuilder,
		private resourcesDataSourceService: ResourcesDataSourceService,
		private messageService: NzMessageService,
		private modal: NzModalRef
	) {
		this.form = this.formBuilder.group({
			name: [null, [Validators.required]],
			password: [null, [Validators.required]]
		});
	}
	
	async addResource(): Promise<void> {
		const actionMessageId = this.messageService.loading('Идёт добавление').messageId;
		
		this.resourcesDataSourceService.addResource(this.form.value)
			.pipe(
				finalize(() => {
					this.messageService.remove(actionMessageId);
				})
			)
			.subscribe(response => {
				this.messageService.success(response);
				this.modal.close({data: true});
			});
	}
	
	closeModal(): void {
		this.modal.close();
	}
}
