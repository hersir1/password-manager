import {Component, OnInit} from '@angular/core';
import {SupportService} from './services/support.service';
import {UserService} from './services/user.service';
import {Router} from '@angular/router';

/* TODO
*   1) Донатики сделать
* */

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    sideMenuIsCollapsed: boolean = false;
    serverStarted: boolean = false;

    constructor(
        private supportService: SupportService,
        public userService: UserService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.supportService.pingServer().subscribe(response => {
            this.serverStarted = response;
        });
    }

    logout(): void {
        this.userService.user = null;
        this.router.navigate(['login']);
    }
}
