import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResourceDto } from '../models/resource-dto.interface';
import { Resource } from '../models/resource.interface';

@Injectable()
export class ResourcesDataSourceService {
	
	baseUrl: string = 'http://localhost:3000/resource';
	
	constructor(private httpClient: HttpClient) {
	}
	
	getResources(
		userId: number,
		pageIndex: number,
		pageSize: number,
		name?: string | null,
		sortColumn?: string | null,
		sortValue?: string | null
	): Observable<Resource[]> {
		let params = new HttpParams();
		
		params = params.append('userId', userId.toString());
		
		if (name) {
			params = params.append('name', name);
		}
		if (sortColumn && sortValue) {
			params = params.append('sortColumn', sortColumn);
			params = params.append('sortValue', sortValue);
		}
		params = params.append('pageIndex', pageIndex.toString());
		params = params.append('pageSize', pageSize.toString());
		
		return this.httpClient.get<Resource[]>(`${this.baseUrl}`, {
			params
		});
	}
	
	getResourcesSize(
		userId: number,
		name?: string | null
	): Observable<number> {
		let params = new HttpParams();
		
		params = params.append('userId', userId.toString());
		
		if (name) {
			params = params.append('name', name);
		}
		return this.httpClient.get<number>(`${this.baseUrl}/size`, {
			params
		});
	}
	
	getResourceById(id: number): Observable<Resource> {
		return this.httpClient.get<Resource>(`${this.baseUrl}/${id}`);
	}
	
	addResource(resourceDto: ResourceDto): Observable<boolean | null> {
		return this.httpClient.post<boolean | null>(`${this.baseUrl}`, resourceDto);
	}
	
	deleteResource(id: number): Observable<boolean> {
		return this.httpClient.delete<boolean>(`${this.baseUrl}/${id}`);
	}
	
	updateResource(resourceDto: ResourceDto): Observable<boolean | null> {
		return this.httpClient.put<boolean | null>(`${this.baseUrl}`, resourceDto);
	}
	
	showResourcePassword(id: number): Observable<string> {
		return this.httpClient.get<string>(`${this.baseUrl}/password/${id}`);
	}
}
