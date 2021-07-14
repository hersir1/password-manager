import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserService } from '../../../../services/user.service';
import { ModalService } from '../../../../services/modal.service';
import { LoginDataSourceService } from '../../services/login-data-source.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
	
	formGroup: FormGroup;
	
	passwordVisible: boolean = false;
	
	loading$: Subject<boolean> = new Subject<boolean>();
	userNameOrPasswordIsIncorrect$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	
	constructor(
		private formBuilder: FormBuilder,
		private userService: UserService,
		private loginDataSourceService: LoginDataSourceService,
		private modalService: ModalService,
		private router: Router
	) {
		this.userService.user = null;
	}
	
	ngOnInit(): void {
		this.formGroup = this.formBuilder.group({
			loginOrEmail: [null, [Validators.required]],
			password: [null, [Validators.required]],
			rememberMe: [false]
		});
	}
	
	login(): void {
		this.loading$.next(true);
		
		this.loginDataSourceService.getUserByLoginOrEmail(
			this.formGroup.get('loginOrEmail')?.value,
			this.formGroup.get('password')?.value
		)
			.pipe(
				untilDestroyed(this),
				finalize(() => {
					this.loading$.next(false);
				})
			)
			.subscribe(response => {
				if (response === null) {
					this.userNameOrPasswordIsIncorrect$.next(true);
				} else {
					this.userService.user = response;
					
					this.router.navigate(['']);
				}
			});
	}
}
