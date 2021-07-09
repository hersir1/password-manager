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
		loadChildren: () => import('./modules/recover-password/recover-password.module').then(m => m.RecoverPasswordModule)
	},
	{
		path: 'about',
		loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
