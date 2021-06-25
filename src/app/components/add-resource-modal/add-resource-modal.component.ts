import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ResourcesService} from "../../services/resources.service";
import {finalize} from "rxjs/operators";
import {NzModalRef} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";

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
		private resourceService: ResourcesService,
		private messageService: NzMessageService,
		private modal: NzModalRef
	) {
		this.form = this.formBuilder.group({
			name: [null, [Validators.required]],
			password: [null, [Validators.required]]
		});
	}
	
	addResource(): void {
		console.log(this.form.value)
		/*const actionMessageId = this.messageService.loading('Идёт добавление').messageId;
		
		this.resourceService.addResource(this.form.value)
			.pipe(
				finalize(() => {
					this.messageService.remove(actionMessageId);
				})
			)
			.subscribe(response => {
				this.messageService.success(response);
				this.modal.close();
			});*/
	}
	
	closeModal(): void {
		this.modal.close();
	}
}
