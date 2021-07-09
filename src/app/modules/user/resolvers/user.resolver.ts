import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserDto } from '../../../model/user-dto';
import { UserDataSourceService } from '../services/user-data-source.service';

@Injectable()
export class UserResolver implements Resolve<UserDto> {
	
	constructor(
		private userServiceDataSource: UserDataSourceService
	) {
	}
	
	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserDto> {
		return this.userServiceDataSource.getUserById(route.params.id);
	}
}
