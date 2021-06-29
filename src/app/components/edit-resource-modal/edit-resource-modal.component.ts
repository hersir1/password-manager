import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesDataSourceService } from '../../services/resources-data-source.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-edit-resource-modal',
	templateUrl: './edit-resource-modal.component.html',
	styleUrls: ['./edit-resource-modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditResourceModalComponent implements OnInit {
	
	@Input()
	id: number;
	
	form: FormGroup;
	passwordVisible: boolean = false;
	
	loading$: Subject<boolean> = new Subject<boolean>();
	
	constructor(
		private formBuilder: FormBuilder,
		private resourcesDataSourceService: ResourcesDataSourceService,
		private messageService: NzMessageService,
		private modal: NzModalRef
	) {
		this.form = this.formBuilder.group({
			id: [null],
			name: [null, [Validators.required]],
			password: [null, [Validators.required]]
		});
	}
	
	ngOnInit(): void {
		this.loading$.next(true);
		
		this.resourcesDataSourceService.getResourceById(this.id)
			.pipe(
				finalize(() => {
					this.loading$.next(false);
				})
			)
			.subscribe(response => {
				this.form.patchValue(response);
			});
	}
	
	updateResource(): void {
		const actionMessageId = this.messageService.loading('Идёт редактирование').messageId;
		
		this.resourcesDataSourceService.updateResource(this.form.value)
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
