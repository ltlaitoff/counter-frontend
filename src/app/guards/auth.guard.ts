import { CanActivateFn, Router } from '@angular/router'
import { AuthGuardService } from '../services/auth-guard.service'
import { inject } from '@angular/core'
import { Observable, first } from 'rxjs'

export const authGuard: CanActivateFn = (route, state) => {
	const authGuardService = inject(AuthGuardService)
	const router = inject(Router)

	return new Observable<boolean>(subscriber => {
		authGuardService.authGuardData.pipe(first()).subscribe(value => {
			if (route.url.toString() === 'authorization') {
				if (value.authorized === true) {
					router.navigate(['/'])
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

			if (router.url !== '/authorization') {
				router.navigate(['/authorization'])
			}
		})
	})
}
