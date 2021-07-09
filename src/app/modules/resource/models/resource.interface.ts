import { Password } from '../../../model/password.interface';

export interface Resource {
	id: number;
	name: string;
	password: Password;
	userId: number;
}