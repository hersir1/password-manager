import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../../../model/user-dto';
import { User } from '../../../model/user';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EditUserDataSourceService {
	
	constructor(
		private httpClient: HttpClient
	) {
	}
	
	getUserById(id: number): Observable<UserDto> {
		return this.httpClient.get<UserDto>(`http://localhost:3000/user/${id}`);
	}
	
	updateUser(userDto: UserDto): Observable<User | null> {
		return this.httpClient.put<User | null>(`http://localhost:3000/user`, userDto);
	}
}
