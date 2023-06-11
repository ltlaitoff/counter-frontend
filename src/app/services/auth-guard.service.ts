import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { ReplaySubject } from 'rxjs'

import { ApiService } from './api.service'
import { User } from 'src/types/User'
import * as ApiInputs from 'src/types/ApiInputs'
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login'
import * as Bowser from 'bowser'
import { UserAuthHardware } from 'src/types/UserAuthHardware'

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService {
	public authGuardData = new ReplaySubject<ApiInputs.InitializeFailed | User>(1)
	private socialAuthServiceUser: SocialUser | null = null

	constructor(
		private router: Router,
		private apiService: ApiService,
		private socialAuthService: SocialAuthService
	) {
		this.apiService.initialize().subscribe(value => {
			this.authGuardData.next(value)
		})

		this.socialAuthService.authState.subscribe(user => {
			this.socialAuthServiceUser = user

			if (user === null) return

			this.apiService
				.authorization(user.idToken, this.getUserHardware())
				.subscribe(authorizationValue => {
					this.authorize(authorizationValue)
				})
		})
	}

	authorize(data: User) {
		this.authGuardData.next(data)
		this.router.navigate(['/'])
	}

	unauthorize() {
		this.apiService.logout().subscribe(value => {
			if (value.status !== 'ok') {
				throw new Error(`Log out error! Response /logout: ${value}`)
			}

			if (this.socialAuthServiceUser) {
				this.socialAuthService.signOut()
			}

			this.authGuardData.next({ authorized: false })
			this.router.navigate(['/authorization'])
		})
	}

	private getUserHardware(): UserAuthHardware {
		const userAgent = window.navigator.userAgent

		const hardware = Bowser.parse(window.navigator.userAgent)

		console.log(hardware)

		return {
			browserName: hardware.browser.name || 'Unknown',
			browserVersion: hardware.browser.version || '',
			osName: hardware.os.name || 'Unknown',
			osVersion: hardware.os.version || '',
			osVersionName: hardware.os.versionName || '',
			userAgent: userAgent,
			platformType: hardware.platform.type || 'Unknown',
			dateOfCreate: new Date(Date.now()).getTime()
		}
	}
}
