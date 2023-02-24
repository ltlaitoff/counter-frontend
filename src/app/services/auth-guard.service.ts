import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { ApiService } from './api.service'
import { User } from '../../types/User'
import { Observable, Subject } from 'rxjs'

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
	private initialized: boolean = false
	private user = new Subject<User>()

	initialize() {
		return new Observable<boolean>(subscriber => {
			this.api.initialize().subscribe(data => {
				subscriber.next(true)
				this.initialized = true

				if (data.authorized) {
					return this.authorize(data)
				}

				console.log('[NOT Authorized]')
			})
		})
	}

	authorize(data: User) {
		console.log('[Authorized]')

		this.authorized = true
		this.user.next(data)
	}

	canActivate() {
		if (!this.initialized) return true

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
