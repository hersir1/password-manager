import { FormGroup, ValidationErrors } from '@angular/forms';

export class PasswordConfirmationValidator {
	
	static checkPasswordsAreTheSame(formGroup: FormGroup): ValidationErrors | null {
		const password = formGroup.get('password')?.value;
		const confirmPassword = formGroup.get('confirmPassword')?.value;
		
		if (password !== confirmPassword) {
			return {
				notTheSame: true
			};
		}
		return null;
	}
}
