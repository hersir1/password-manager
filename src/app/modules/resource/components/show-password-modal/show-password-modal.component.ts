import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { ResourcesDataSourceService } from '../../services/resources-data-source.service';
import { finalize, map, take } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzModalRef } from 'ng-zorro-antd/modal';

@UntilDestroy()
@Component({
	selector: 'app-show-password-modal',
	templateUrl: './show-password-modal.component.html',
	styleUrls: ['./show-password-modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ResourcesDataSourceService
	]
})
export class ShowPasswordModalComponent implements OnInit {
	
	@Input()
	id: number;
	
	timer$: Observable<number>;
	
	loading$: Subject<boolean> = new Subject<boolean>();
	password: string;
	
	constructor(
		private resourcesDataSourceService: ResourcesDataSourceService,
		private modal: NzModalRef
	) {
	}
	
	ngOnInit(): void {
		this.loading$.next(true);
		
		this.resourcesDataSourceService.showResourcePassword(this.id)
			.pipe(
				untilDestroyed(this),
				finalize(() => {
					this.loading$.next(false);
				})
			)
			.subscribe(response => {
				const start = 10;
				this.timer$ = timer(0, 1000)
					.pipe(
						map(i => start - i),
						take(start + 1),
						finalize(() => {
							this.modal.close();
						})
					);
				
				this.password = response;
			});
	}
}
