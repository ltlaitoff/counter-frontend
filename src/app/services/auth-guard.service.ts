import { Injectable } from '@angular/core'
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot
} from '@angular/router'
import { Observable, ReplaySubject, first } from 'rxjs'

import { ApiService } from './api.service'
import { User } from 'src/types/User'
import * as ApiInputs from 'src/types/ApiInputs'
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login'
import { GoogleLoginProvider } from '@abacritt/angularx-social-login'

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
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
				.authorization(user.idToken)
				.subscribe(authorizationValue => {
					this.authorize(authorizationValue)
				})
		})
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return new Observable<boolean>(subscriber => {
			this.authGuardData.pipe(first()).subscribe(value => {
				console.log(value)

				if (route.url.toString() === 'authorization') {
					if (value.authorized === true) {
						this.router.navigate(['/'])
						subscriber.next(false)
						return
					}

					subscriber.next(true)
					return
				}

				if (value.authorized === true) {
					subscriber.next(true)
					return
				}

				subscriber.next(false)

				if (this.router.url !== '/authorization') {
					console.log(
						'%c ',
						'background: no-repeat url(https://i.cloudup.com/Zqeq2GhGjt-3000x3000.jpeg); font-size: 1px; padding: 166.5px 250px; background-size: 500px 333px;'
					)
					this.router.navigate(['/authorization'])
				}
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
}
