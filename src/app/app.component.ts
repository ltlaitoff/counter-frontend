import { Component, OnInit } from '@angular/core'
import { environment } from 'src/environments/environment'
import { User } from 'src/types/User'
import { AuthGuardService } from './services/auth-guard.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	userData: User | null = null
	initialize: boolean = false

	title = 'counter-frontend'

	ngOnInit() {
		console.info(`Current version: ${environment.version}`)

		this.authGuard.authGuardData.subscribe(newUserData => {
			this.initialize = true

			if (newUserData.authorized) {
				this.userData = newUserData
				return
			}

			this.userData = null
		})
	}

	constructor(private authGuard: AuthGuardService) {}
}
