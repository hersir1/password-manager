import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResourceDto } from '../model/resource-dto.interface';
import { Resource } from '../model/resource.interface';

@Injectable({
	providedIn: 'root'
})
export class ResourcesDataSourceService {
	
	baseUrl: string = 'http://localhost:3000';
	
	constructor(private httpClient: HttpClient) {
	}
	
	getResources(
		pageIndex: number,
		pageSize: number,
		name?: string,
		sortColumn?: string | null,
		sortValue?: string | null
	): Observable<Resource[]> {
		let params = new HttpParams();
		
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
	
	getResourcesSize(name?: string): Observable<number> {
		let params = new HttpParams();
		
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
	
	addResource(resourceDto: ResourceDto): Observable<string> {
		return this.httpClient.post<string>(`${this.baseUrl}`, resourceDto);
	}
	
	deleteResource(id: number): Observable<string> {
		return this.httpClient.delete<string>(`${this.baseUrl}/${id}`);
	}
	
	updateResource(resourceDto: ResourceDto): Observable<string> {
		return this.httpClient.put<string>(`${this.baseUrl}`, resourceDto);
	}
	
	showResourcePassword(id: number): Observable<string> {
		return this.httpClient.get<string>(`${this.baseUrl}/password/${id}`);
	}
}