import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UserDataSourceService } from '../../services/user-data-source.service';
import { ActivatedRoute } from '@angular/router';
import { PasswordConfirmationValidator } from '../../../../validators/password-confirmation.validator';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '../../../../services/user.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
	selector: 'app-edit-user',
	templateUrl: './edit-user.component.html',
	styleUrls: ['./edit-user.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserComponent implements OnInit {
	
	formGroup: FormGroup;
	
	loading$: Subject<boolean> = new Subject<boolean>();
	userIsExist$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	
	constructor(
		private location: Location,
		private userDataSourceService: UserDataSourceService,
		private activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private messageService: NzMessageService,
		private userService: UserService
	) {
	}
	
	ngOnInit(): void {
		this.activatedRoute.data
			.pipe(
				untilDestroyed(this)
			)
			.subscribe(response => {
				this.formGroup = this.formBuilder.group({
					id: [response.id],
					email: [response.email, [Validators.required, Validators.email]],
					login: [response.login, [Validators.required]],
					password: [response.password, [Validators.required]],
					confirmPassword: [response.password, [Validators.required]]
				}, {
					validators: PasswordConfirmationValidator.checkPasswordsAreTheSame
				});
			});
	}
	
	editUser(): void {
		this.loading$.next(true);
		
		this.userDataSourceService.updateUser(this.formGroup.value)
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
					this.messageService.success('Информация успешно обновлена');
					
					this.userService.user = response;
					
					this.back();
				}
			});
	}
	
	back(): void {
		this.location.back();
	}
}
