import { Password } from './password.interface';

export interface Resource {
	id: number;
	name: string;
	password: Password;
}