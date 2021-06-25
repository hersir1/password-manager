import {Component, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, Subject} from "rxjs";
import {Resource} from "../../model/resource.interface";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {ResourcesService} from "../../services/resources.service";
import {debounceTime, finalize, switchMap, tap} from "rxjs/operators";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ISearchParams} from "../../model/search-params.interface";
import {NzModalService} from "ng-zorro-antd/modal";
import {AddResourceModalComponent} from "../add-resource-modal/add-resource-modal.component";

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
		private resourceService: ResourcesService,
		private modal: NzModalService
	) {
	}
	
	ngOnInit(): void {
		this.paramsChange$
			.pipe(
				tap(() => this.loading = true),
				untilDestroyed(this),
				debounceTime(500),
				switchMap(params => forkJoin([
						this.resourceService.getResources(
							params.pageIndex,
							params.pageSize,
							params.name,
							params.sortColumn,
							params.sortValue
						),
						this.resourceService.getResourcesSize(
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
	
	search() {
		this.paramsChange$.next({
			name: this.nameSearch,
			sortColumn: this.sortColumn,
			sortValue: this.sortValue,
			pageSize: this.pageSize,
			pageIndex: this.pageIndex
		});
	}
	
	showAddResourceModal(): void {
		this.modal.create({
			nzTitle: 'Добавление ресурса',
			nzContent: AddResourceModalComponent,
			nzFooter: null
		});
	}
	
	ngOnDestroy(): void {
	}
}
