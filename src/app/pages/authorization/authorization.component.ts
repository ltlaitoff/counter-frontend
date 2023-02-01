declare const google: any

import { Component, AfterViewInit } from '@angular/core'
import { accounts } from 'google-one-tap'

import { environment } from 'src/environments/environment'
import { ApiService } from '../../services/api.service'
import { AuthGuardService } from '../../services/auth-guard.service'

@Component({
	selector: 'app-authorization',
	templateUrl: './authorization.component.html',
	styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements AfterViewInit {
	authorizedStatus: string = 'not authorization'

	ngAfterViewInit() {
		const googleAccounts: accounts = google.accounts

		googleAccounts.id.initialize({
			client_id: environment.googleClientId,
			ux_mode: 'popup',
			cancel_on_tap_outside: true,
			callback: ({ credential }) => {
				console.log(credential)
				this.api.authorization(credential).subscribe(value => {
					this.authGuard.authorize(value)
					console.log(JSON.stringify(value, null, '\t'))
				})
			}
		})

		googleAccounts.id.renderButton(
			document.getElementById('gbtn') as HTMLElement,
			{
				size: 'large',
				width: 320
			}
		)
	}

	constructor(private api: ApiService, private authGuard: AuthGuardService) {}
}
