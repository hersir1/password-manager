import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { EditUserComponent } from '../edit-user/components/edit-user/edit-user.component';

const routes: Routes = [
	{
		path: '',
		component: UserInfoComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserRoutingModule {
}
