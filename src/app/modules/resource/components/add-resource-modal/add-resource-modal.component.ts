import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesDataSourceService } from '../../services/resources-data-source.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

import { finalize } from 'rxjs/operators';
import { UserService } from '../../../../services/user.service';
import { Subject } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
	selector: 'app-add-resource-modal',
	templateUrl: './add-resource-modal.component.html',
	styleUrls: ['./add-resource-modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddResourceModalComponent {
	
	formGroup: FormGroup;
	passwordVisible: boolean = false;
	
	resourceIsExist$: Subject<boolean> = new Subject<boolean>();
	
	constructor(
		private formBuilder: FormBuilder,
		private resourcesDataSourceService: ResourcesDataSourceService,
		private messageService: NzMessageService,
		private modal: NzModalRef,
		private userService: UserService
	) {
		this.formGroup = this.formBuilder.group({
			name: [null, [Validators.required]],
			password: [null, [Validators.required]],
			userId: [this.userService.user.id]
		});
	}
	
	addResource(): void {
		const actionMessageId = this.messageService.loading('Идёт добавление').messageId;
		
		this.resourcesDataSourceService.addResource(this.formGroup.value)
			.pipe(
				untilDestroyed(this),
				finalize(() => {
					this.messageService.remove(actionMessageId);
				})
			)
			.subscribe(response => {
				if (response === null) {
					this.resourceIsExist$.next(true);
				} else {
					this.messageService.success('Ресурс успешно добавлен');
					this.modal.close({data: true});
				}
			});
	}
	
	closeModal(): void {
		this.modal.close();
	}
}
