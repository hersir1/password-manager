import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../../../model/user-dto';
import { Observable } from 'rxjs';
import { User } from '../../../model/user';

@Injectable()
export class RegisterDataSourceService {
	
	constructor(private httpClient: HttpClient) {
	}
	
	addUser(userDto: UserDto): Observable<User | null> {
		return this.httpClient.post<User | null>(`http://localhost:3000/user`, userDto);
	}
}
