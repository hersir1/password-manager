import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./modules/resource/resource.module').then(m => m.ResourceModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'login',
		loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
	},
	{
		path: 'register',
		loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)
	},
	{
		path: 'recover-password',
		loadChildren: () => import('./modules/recover-password/recover-password.module').then(m => m.RecoverPasswordModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'about',
		loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule)
	},
	{
		path: 'user-info',
		loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'edit-user',
		loadChildren: () => import('./modules/edit-user/edit-user.module').then(m => m.EditUserModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'change-log',
		loadChildren: () => import('./modules/change-log/change-log.module').then(m => m.ChangeLogModule)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
