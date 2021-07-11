import { Component, OnInit } from '@angular/core';
import { SupportService } from './services/support.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	
	sideMenuIsCollapsed: boolean = false;
	serverStarted: boolean = false;
	
	constructor(private supportService: SupportService) {
	}
	
	ngOnInit(): void {
		this.supportService.pingServer().subscribe(response => {
			this.serverStarted = response;
		});
	}
}
