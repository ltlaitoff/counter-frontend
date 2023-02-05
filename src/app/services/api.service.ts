import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '../../types/User'
import { Category } from 'src/types/Category'
import { Statistic } from '../../types/Statistic'

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

	getAllCategories() {
		return this.http.get<Category[]>(`${API_BASE_URL}/category/all`, {
			withCredentials: true,
			responseType: 'json'
		})
	}

	getAllStatisticRecords() {
		return this.http.get<Statistic[]>(`${API_BASE_URL}/statistic/all`, {
			withCredentials: true,
			responseType: 'json'
		})
	}

	addStatisticRecord(
		data: Omit<Omit<Statistic, 'category'>, 'date'> & {
			category: string
			date: number
		}
	) {
		console.log('api call', data)

		return this.http.post(`${API_BASE_URL}/statistic/add`, data, {
			withCredentials: true
		})
	}

	constructor(private http: HttpClient) {}
}
