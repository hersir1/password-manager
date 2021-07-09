import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';

const routes: Routes = [
	{
		path: '',
		component: RecoverPasswordComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RecoverPasswordRoutingModule {
}
