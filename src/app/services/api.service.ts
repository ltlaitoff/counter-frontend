import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '../../types/User'
import { Category } from 'src/types/Category'
import { Statistic } from '../../types/Statistic'
import { Color } from 'src/types/Color'
import { environment } from 'src/environments/environment'
import * as ApiInputs from 'src/types/ApiInputs'

const API_BASE_URL = environment.API_HOST

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	initialize() {
		const initialize = this.http.get<
			ApiInputs.InitializeFailed | ApiInputs.InitializeSuccess
		>(`${API_BASE_URL}/initialize`, {
			withCredentials: true,
			responseType: 'json'
		})

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

	addStatisticRecord(data: ApiInputs.AddStatisticInputs) {
		return this.http.post<Statistic>(`${API_BASE_URL}/statistic/add`, data, {
			withCredentials: true
		})
	}

	deleteStatistic(id: string) {
		return this.http.delete(`${API_BASE_URL}/statistic/${id}`, {
			withCredentials: true
		})
	}

	getAllColors() {
		return this.http.get<Color[]>(`${API_BASE_URL}/color/all`, {
			withCredentials: true
		})
	}

	addCategory(data: ApiInputs.AddCategoryInputs) {
		return this.http.post<Category>(`${API_BASE_URL}/category/add`, data, {
			withCredentials: true
		})
	}

	deleteCategory(id: string) {
		return this.http.delete(`${API_BASE_URL}/category/${id}`, {
			withCredentials: true
		})
	}

	constructor(private http: HttpClient) {}
}
