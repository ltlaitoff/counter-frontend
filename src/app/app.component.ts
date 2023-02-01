import { Component, OnInit } from '@angular/core'
import { AuthGuardService } from './services/auth-guard.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'counter-frontend'

	ngOnInit() {
		this.authGuard.initialize()
	}

	constructor(private authGuard: AuthGuardService) {}
}
