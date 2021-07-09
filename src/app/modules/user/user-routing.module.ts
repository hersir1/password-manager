import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UserResolver } from './resolvers/user.resolver';

const routes: Routes = [
	{
		path: '',
		component: UserInfoComponent
	},
	{
		path: '',
		component: EditUserComponent,
		resolve: UserResolver
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserRoutingModule {
}
