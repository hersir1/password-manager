import { Injectable } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable()
export class ModalService {
	
	constructor(private nzModalService: NzModalService) {
	}
	
	createErrorModal(error: string, onOkFunction?: () => void): void {
		const errorModal: NzModalRef = this.nzModalService.error({
			nzTitle: 'Ошибка программы',
			nzContent: error,
			nzOkType: 'primary'
		});
		
		if (onOkFunction) {
			errorModal.afterClose
				.pipe(
					untilDestroyed(this)
				)
				.subscribe(() => {
				onOkFunction();
			});
		}
	}
}
