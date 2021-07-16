import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Log } from '../../models/log.interface';

/*TODO дату вписать перед релизом*/

@Component({
	selector: 'app-change-log',
	templateUrl: './change-log.component.html',
	styleUrls: ['./change-log.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeLogComponent {
	
	changeLog: Log[] = [
		{
			version: '0.0.1',
			date: new Date()
		}
	];
	
	constructor() {
	}
	
}
