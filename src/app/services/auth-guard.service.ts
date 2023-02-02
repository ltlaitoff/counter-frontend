import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { ApiService } from './api.service'
import { User } from '../../types/User'
import { Subject } from 'rxjs'

/*
	Выполнение запроса на инициализацию - базового первого запроса который делается при каждом заходе на страницу
	Сохранение результатов запроса в память
	Если результат "не авторизированный" - показывать страницу авторизации
	Если результат "авторизированный" - хранить в себе данные пользователя

*/

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
	private authorized: boolean = false
	private user = new Subject<User>()

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

	authorize(data: User) {
		console.log('[Authorized]')
		this.authorized = true
		this.user.next(data)

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

	getUserData() {
		return this.user
	}

	constructor(private router: Router, private api: ApiService) {}
}
