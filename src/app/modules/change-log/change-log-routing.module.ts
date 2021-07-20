import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeLogComponent } from './components/change-log/change-log.component';

const routes: Routes = [
	{
		path: '',
		component: ChangeLogComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ChangeLogRoutingModule {
}
