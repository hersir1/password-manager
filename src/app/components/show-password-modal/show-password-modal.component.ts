import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ResourcesDataSourceService } from '../../services/resources-data-source.service';
import { finalize } from 'rxjs/operators';

@Component({
	selector: 'app-show-password-modal',
	templateUrl: './show-password-modal.component.html',
	styleUrls: ['./show-password-modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowPasswordModalComponent implements OnInit {
	
	@Input()
	id: number;
	
	loading$: Subject<boolean> = new Subject<boolean>();
	password: string;
	
	constructor(
		private resourcesDataSourceService: ResourcesDataSourceService
	) {
	}
	
	ngOnInit(): void {
		this.loading$.next(true);
		
		this.resourcesDataSourceService.showResourcePassword(this.id)
			.pipe(
				finalize(() => {
					this.loading$.next(false);
				})
			)
			.subscribe(response => {
				this.password = response;
			});
	}
	
}
