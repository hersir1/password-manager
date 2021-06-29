import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Resource } from '../../model/resource.interface';
import { forkJoin, Subject } from 'rxjs';
import { ISearchParams } from '../../model/search-params.interface';
import { ResourcesDataSourceService } from '../../services/resources-data-source.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { AddResourceModalComponent } from '../add-resource-modal/add-resource-modal.component';
import { EditResourceModalComponent } from '../edit-resource-modal/edit-resource-modal.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ShowPasswordModalComponent } from '../show-password-modal/show-password-modal.component';

@UntilDestroy()
@Component({
	selector: 'app-resources-list',
	templateUrl: './resources-list.component.html',
	styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent implements OnInit, OnDestroy {
	
	resources: Resource[] = [];
	total: number = 0;
	
	loading: boolean = false;
	
	pageSize: number;
	pageIndex: number;
	sortValue: string | null;
	sortColumn: string | null;
	nameSearch: string;
	
	paramsChange$: Subject<ISearchParams> = new Subject<ISearchParams>();
	
	constructor(
		private resourcesDataSourceService: ResourcesDataSourceService,
		private modal: NzModalService,
		private messageService: NzMessageService
	) {
	}
	
	ngOnInit(): void {
		this.paramsChange$
			.pipe(
				tap(() => this.loading = true),
				untilDestroyed(this),
				debounceTime(500),
				switchMap(params => forkJoin([
						this.resourcesDataSourceService.getResources(
							params.pageIndex,
							params.pageSize,
							params.name,
							params.sortColumn,
							params.sortValue
						),
						this.resourcesDataSourceService.getResourcesSize(
							params.name
						)
					])
						.pipe(
							finalize(() => {
								this.loading = false;
							})
						)
				)
			)
			.subscribe(responseList => {
				this.resources = responseList[0];
				this.total = responseList[1];
			});
	}
	
	onQueryChangeParams(params: NzTableQueryParams): void {
		const {pageSize, pageIndex, sort} = params;
		const currentSort = sort.find(item => item.value !== null);
		const sortColumn = (currentSort && currentSort.key) || null;
		const sortValue = (currentSort && currentSort.value) || null;
		
		this.pageIndex = pageIndex;
		this.pageSize = pageSize;
		this.sortValue = sortValue;
		this.sortColumn = sortColumn;
		
		this.paramsChange$.next({
			name: this.nameSearch,
			pageIndex,
			pageSize,
			sortColumn,
			sortValue
		});
	}
	
	search(): void {
		this.paramsChange$.next({
			name: this.nameSearch,
			sortColumn: this.sortColumn,
			sortValue: this.sortValue,
			pageSize: this.pageSize,
			pageIndex: this.pageIndex
		});
	}
	
	showAddResourceModal(): void {
		const modal = this.modal.create({
			nzTitle: 'Добавление ресурса',
			nzContent: AddResourceModalComponent,
			nzFooter: null,
			nzMaskClosable: false
		});
		
		modal.afterClose.subscribe(response => {
			if (response) {
				this.paramsChange$.next({
					pageSize: this.pageSize,
					pageIndex: 1
				});
			}
		});
	}
	
	showEditResourceModal(id: number): void {
		const modal = this.modal.create({
			nzTitle: 'Редактирование ресурса',
			nzContent: EditResourceModalComponent,
			nzFooter: null,
			nzMaskClosable: false,
			nzComponentParams: {
				id
			}
		});
		
		modal.afterClose.subscribe(response => {
			if (response) {
				this.paramsChange$.next({
					pageSize: this.pageSize,
					pageIndex: 1
				});
			}
		});
	}
	
	showDeleteModal(id: number): void {
		this.modal.confirm({
			nzTitle: 'Вы действительно хотите удалить запись?',
			nzOnOk: () => this.deleteResource(id)
		});
	}
	
	deleteResource(id: number): void {
		this.loading = true;
		
		this.resourcesDataSourceService.deleteResource(id)
			.pipe(
				finalize(() => {
					this.loading = false;
				})
			)
			.subscribe(response => {
				this.messageService.success(response);
				this.paramsChange$.next({
					pageSize: this.pageSize,
					pageIndex: 1
				});
			});
	}
	
	showResourcePasswordModal(id: number): void {
		this.modal.confirm({
			nzTitle: '<b>Вы уверены, что хотите просмотреть свой пароль?</b>',
			nzContent: '<b>Убедитесь, что никто кроме вас его не увидит</b>',
			nzOnOk: () => this.showResourcePassword(id)
		});
	}
	
	showResourcePassword(id: number): void {
		this.modal.create({
			nzTitle: 'Просмотр пароля',
			nzContent: ShowPasswordModalComponent,
			nzFooter: null,
			nzMaskClosable: false,
			nzComponentParams: {
				id
			}
		});
	}
	
	ngOnDestroy(): void {
	}
}
