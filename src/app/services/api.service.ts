import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '../../types/User'

const API_BASE_URL: string = 'http://localhost:8000'

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	initialize() {
		type InitializeFailed = {
			authorized: false
		}

		const initialize = this.http.get<InitializeFailed | User>(
			`${API_BASE_URL}/initialize`,
			{
				withCredentials: true,
				responseType: 'json'
			}
		)

		return initialize
	}

	authorization(JWTGoogleAuthorizationToken: string) {
		return this.http.post<User>(`${API_BASE_URL}/authorization`, null, {
			withCredentials: true,
			responseType: 'json',
			headers: new HttpHeaders({
				Authorization: JWTGoogleAuthorizationToken
			})
		})
	}

	constructor(private http: HttpClient) {}
}
