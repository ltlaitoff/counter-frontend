import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { ApiService } from './api.service'
import { User } from '../../types/User'

/*
	Выполнение запроса на инициализацию - базового первого запроса который делается при каждом заходе на страницу
	Сохранение результатов запроса в память
	Если результат "не авторизированный" - показывать страницу авторизации
	Если результат "авторизированный" - хранить в себе данные пользователя

*/

interface UserAuthorizationSucceed extends User {
	authorized: true
}

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
	private authorized: boolean = false
	private user: User | null = null

	initialize() {
		this.api.initialize().subscribe(data => {
			console.log(
				'🚀 ~ file: auth-guard.service.ts:23 ~ AuthGuardService ~ this.api.initialize ~ data',
				data
			)

			if (data.authorized) {
				return this.authorize(data)
			}

			console.log('[NOT Authorized]')
			return
		})
	}

	authorize(data: UserAuthorizationSucceed) {
		console.log('[Authorized]')
		this.authorized = true
		this.user = data

		this.router.navigate(['/'])
		return
	}

	canActivate() {
		if (!this.authorized) {
			this.router.navigate(['/authorization'])
			return false
		}

		return true
	}

	constructor(private router: Router, private api: ApiService) {
		// this.router.navigate(['authorization'])
		// this.router.navigate(['/authorization'])
	}
}
