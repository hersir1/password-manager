import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesDataSourceService } from '../../services/resources-data-source.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from '../../../../services/user.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
	selector: 'app-edit-resource-modal',
	templateUrl: './edit-resource-modal.component.html',
	styleUrls: ['./edit-resource-modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ResourcesDataSourceService
	]
})
export class EditResourceModalComponent implements OnInit {
	
	@Input()
	id: number;
	
	formGroup: FormGroup;
	passwordVisible: boolean = false;
	
	loading$: Subject<boolean> = new Subject<boolean>();
	resourceIsExist$: Subject<boolean> = new Subject<boolean>();
	
	constructor(
		private formBuilder: FormBuilder,
		private resourcesDataSourceService: ResourcesDataSourceService,
		private messageService: NzMessageService,
		private userService: UserService,
		private modal: NzModalRef
	) {
		this.formGroup = this.formBuilder.group({
			id: [null],
			name: [null, [Validators.required]],
			password: [null, [Validators.required]],
			userId: [this.userService.user!.id]
		});
	}
	
	ngOnInit(): void {
		this.loading$.next(true);
		
		this.resourcesDataSourceService.getResourceById(this.id)
			.pipe(
				untilDestroyed(this),
				finalize(() => {
					this.loading$.next(false);
				})
			)
			.subscribe(response => {
				this.formGroup.patchValue(response);
			});
	}
	
	updateResource(): void {
		const actionMessageId = this.messageService.loading('Идёт редактирование').messageId;
		
		this.resourcesDataSourceService.updateResource(this.formGroup.value)
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
					this.messageService.success('Информация успешно обновлена');
					this.modal.close({data: true});
				}
			});
	}
	
	closeModal(): void {
		this.modal.close();
	}
}
