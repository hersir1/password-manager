import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Resource } from '../../models/resource.interface';
import { BehaviorSubject, forkJoin, Subject } from 'rxjs';
import { ISearchParams } from '../../models/search-params.interface';
import { ResourcesDataSourceService } from '../../services/resources-data-source.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { debounceTime, distinctUntilChanged, finalize, switchMap, tap } from 'rxjs/operators';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { AddResourceModalComponent } from '../add-resource-modal/add-resource-modal.component';
import { EditResourceModalComponent } from '../edit-resource-modal/edit-resource-modal.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ShowPasswordModalComponent } from '../show-password-modal/show-password-modal.component';
import { UserService } from '../../../../services/user.service';

@UntilDestroy()
@Component({
	selector: 'app-resources-list',
	templateUrl: './resources-list.component.html',
	styleUrls: ['./resources-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourcesListComponent implements OnInit {
	
	resources: Resource[] = [];
	total: number = 0;
	
	loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
	
	pageSize: number;
	pageIndex: number;
	sortValue: string | null;
	sortColumn: string | null;
	nameSearch: string;
	
	paramsChange$: Subject<ISearchParams> = new Subject<ISearchParams>();
	
	constructor(
		private resourcesDataSourceService: ResourcesDataSourceService,
		private modal: NzModalService,
		private messageService: NzMessageService,
		private userService: UserService
	) {
	}
	
	ngOnInit(): void {
		/*TODO после удаления loading здесь не отрабатывает*/
		this.paramsChange$
			.pipe(
				debounceTime(1000),
				distinctUntilChanged((prev, curr) => prev.name === curr.name),
				tap((param) => {
					this.loading$.next(true);
				}),
				untilDestroyed(this),
				switchMap(params => forkJoin([
						this.resourcesDataSourceService.getResources(
							this.userService.user.id,
							params.pageIndex,
							params.pageSize,
							params.name,
							params.sortColumn,
							params.sortValue
						),
						this.resourcesDataSourceService.getResourcesSize(
							this.userService.user.id,
							params.name
						)
					])
						.pipe(
							untilDestroyed(this),
							finalize(() => {
								this.loading$.next(false);
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
	
	search(value: string | null): void {
		this.paramsChange$.next({
			name: value,
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
		
		modal.afterClose
			.pipe(
				untilDestroyed(this)
			)
			.subscribe(response => {
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
		
		modal.afterClose
			.pipe(
				untilDestroyed(this)
			)
			.subscribe(response => {
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
		this.loading$.next(true);
		
		this.resourcesDataSourceService.deleteResource(id)
			.pipe(
				untilDestroyed(this),
				finalize(() => {
					this.loading$.next(false);
				})
			)
			.subscribe(response => {
				if (response) {
					this.messageService.success('Ресурс успешно удалён');
					this.paramsChange$.next({
						pageSize: this.pageSize,
						pageIndex: 1
					});
				}
			});
	}
	
	showResourcePasswordModal(id: number, name: string): void {
		this.modal.confirm({
			nzTitle: `Вы уверены, что хотите просмотреть свой пароль от ресурса <b>${name}</b>?`,
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
	
	clearNameSearch(): void {
		this.nameSearch = '';
		this.search(null);
	}
}
