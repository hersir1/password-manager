import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserDataSourceService {
	
	constructor(private httpClient: HttpClient) {
	}
	
	deleteUser(id: number): Observable<void> {
		return this.httpClient.delete<void>(`http://localhost:3000/user/${id}`);
	}
}
