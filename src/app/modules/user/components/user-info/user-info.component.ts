import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserDataSourceService } from '../../services/user-data-source.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ResourcesDataSourceService } from '../../../resource/services/resources-data-source.service';

@UntilDestroy()
@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent {

    loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        public userService: UserService,
        private nzModalService: NzModalService,
        private userServiceDataSource: UserDataSourceService,
        private resourcesDataSourceService: ResourcesDataSourceService,
        private router: Router,
        private nzMessageService: NzMessageService
    ) {
    }

    deleteUserModal(): void {
        this.nzModalService.confirm({
            nzTitle: `Вы уверены, что хотите удалить пользователя?`,
            nzOnOk: () => this.deleteUser()
        });
    }

    private deleteUser(): void {
        this.loading$.next(true);

        forkJoin([
            this.userServiceDataSource.deleteUser(this.userService.user!.id),
            this.resourcesDataSourceService.deleteAllUserResources(this.userService.user!.id)
        ])
            .pipe(
                untilDestroyed(this),
                finalize(() => {
                    this.loading$.next(false);
                })
            )
            .subscribe(() => {
                this.nzMessageService.success('Пользователь успешно удалён');
                this.userService.user = null;
                this.router.navigate(['login']);
            });
    }
}
