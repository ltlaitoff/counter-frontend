import { Component, OnInit } from '@angular/core'
import { ApiService } from 'src/app/services/api.service'
import { AuthGuardService } from 'src/app/services/auth-guard.service'
import { UserSession } from '../sessions.types'

@Component({
	selector: 'app-session-page',
	templateUrl: './session-page.component.html'
})
export class SessionPageComponent implements OnInit {
	constructor(
		private apiService: ApiService,
		private authGuardService: AuthGuardService
	) {}

	sessions: UserSession[] | null = null
	nowSessionId: string | null = null

	ngOnInit() {
		this.apiService.getUserSessions().subscribe(value => {
			this.sessions = value.map(this.checkOnAllFields)
		})

		this.authGuardService.authGuardData.subscribe(value => {
			if (value.authorized) {
				this.nowSessionId = value.sessionId
			}
		})
	}

	deleteSession(id: string) {
		if (id === this.nowSessionId) {
			this.authGuardService.unauthorize()
			return
		}

		this.apiService.deleteUserSession(id).subscribe(value => {
			this.sessions = this.sessions?.filter(
				item => item._id !== value._id
			) as UserSession[]
		})
	}

	private checkOnAllFields(item: any): UserSession {
		return {
			_id: item._id,
			expires: item.expires,
			cookie: {
				expires: item.cookie.expires
			},
			authorized: item.authorized,
			userId: item.userId,
			browserName: item.browserName || 'Unknown',
			browserVersion: item.browserVersion || '',
			osName: item.osName || 'Unknown',
			osVersion: item.osVersion || '',
			osVersionName: item.osVersionName || '',
			userAgent: item.userAgent || '',
			platformType: item.platformType || '',
			dateOfCreate: item.dateOfCreate || -1
		}
	}
}
