import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../model/user';

@Injectable()
export class LoginDataSourceService {
	
	constructor(private httpClient: HttpClient) {
	}
	
	getUserByLoginOrEmail(loginOrEmail: string, password: string): Observable<User | null> {
		let httpParams = new HttpParams();
		
		httpParams = httpParams.append('loginOrEmail', loginOrEmail);
		httpParams = httpParams.append('password', password);
		
		return this.httpClient.get<User>(`http://localhost:3000/user/login`, {
			params: httpParams
		});
	}
}
