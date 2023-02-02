import { Component, OnInit } from '@angular/core'

import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login'
import { GoogleLoginProvider } from '@abacritt/angularx-social-login'

import { ApiService } from '../../services/api.service'
import { AuthGuardService } from '../../services/auth-guard.service'

@Component({
	selector: 'app-authorization',
	templateUrl: './authorization.component.html',
	styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {
	user: SocialUser | null = null
	loggedIn: boolean = false

	constructor(
		private socialAuthService: SocialAuthService,
		private api: ApiService,
		private authGuard: AuthGuardService
	) {}

	signInWithGoogle(): void {
		this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
	}

	refreshToken(): void {
		this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID)
	}

	signOut(): void {
		this.socialAuthService.signOut()
	}

	ngOnInit() {
		this.socialAuthService.authState.subscribe(user => {
			this.api.authorization(user.idToken).subscribe(value => {
				this.authGuard.authorize(value)
			})
		})
	}
}
