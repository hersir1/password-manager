import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable()
export class UserService {
	
	user: User | null;
	
	constructor() {
	}
}
