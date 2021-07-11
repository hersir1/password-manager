import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { delay, retryWhen } from 'rxjs/operators';

@Injectable()
export class SupportService {
	
	baseUrl: string = 'http://localhost:3000/ping';
	
	constructor(
		private httpClient: HttpClient
	) {
	}
	
	pingServer(): Observable<boolean> {
		return this.httpClient.get<boolean>(this.baseUrl)
			.pipe(
				retryWhen(errors => errors.pipe(delay(2000)))
			);
	}
}
