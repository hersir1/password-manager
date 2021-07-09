import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterDataSourceService } from '../../services/register-data-source.service';
import { UserService } from '../../../../services/user.service';
import { finalize } from 'rxjs/operators';
import { PasswordConfirmationValidator } from '../../../../validators/password-confirmation.validator';
import { BehaviorSubject, Subject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {
	
	formGroup: FormGroup;
	
	passwordVisible: boolean = false;
	confirmPasswordVisible: boolean = false;
	
	loading$: Subject<boolean> = new Subject<boolean>();
	userIsExist$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	
	constructor(
		private formBuilder: FormBuilder,
		private userService: UserService,
		private registerDataSourceService: RegisterDataSourceService,
		private router: Router,
		private messageService: NzMessageService,
	) {
	}
	
	ngOnInit(): void {
		this.formGroup = this.formBuilder.group({
			email: [null, [Validators.required, Validators.email]],
			login: [null, [Validators.required]],
			password: [null, [Validators.required]],
			confirmPassword: [null, [Validators.required]]
		}, {
			validators: PasswordConfirmationValidator.checkPasswordsAreTheSame
		});
	}
	
	addUser(): void {
		this.loading$.next(true);
		
		this.registerDataSourceService.addUser(this.formGroup.value)
			.pipe(
				untilDestroyed(this),
				finalize(() => {
					this.loading$.next(false);
				})
			)
			.subscribe(response => {
				if (response === null) {
					this.userIsExist$.next(true);
				} else {
					this.messageService.success('Пользователь успешно зарегистрирован');
					
					this.userService.user = response;
					
					this.router.navigate(['']);
				}
			});
	}
}
