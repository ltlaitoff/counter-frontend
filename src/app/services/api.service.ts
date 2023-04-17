import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '../../types/User'
import { Category } from 'src/types/Category'
import { Statistic } from '../../types/Statistic'
import { Color } from 'src/types/Color'
import { environment } from 'src/environments/environment'
import * as ApiInputs from 'src/types/ApiInputs'
import { CategoryGroup } from '../../types/CategoryGroup'

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

	/* Authorization */

	authorization(JWTGoogleAuthorizationToken: string) {
		return this.http.post<User>(`${API_BASE_URL}/authorization`, null, {
			withCredentials: true,
			responseType: 'json',
			headers: new HttpHeaders({
				Authorization: JWTGoogleAuthorizationToken
			})
		})
	}

	logout() {
		return this.http.post<{ status: 'ok' | unknown }>(
			`${API_BASE_URL}/authorization/logout`,
			null,
			{
				withCredentials: true,
				responseType: 'json'
			}
		)
	}

	/* Statistic */

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

	updateStatistic(id: string, data: ApiInputs.AddStatisticInputs) {
		return this.http.put<Statistic>(`${API_BASE_URL}/statistic/${id}`, data, {
			withCredentials: true
		})
	}

	/* Color */

	getAllColors() {
		return this.http.get<Color[]>(`${API_BASE_URL}/color/all`, {
			withCredentials: true
		})
	}

	/* Category */

	getAllCategories() {
		return this.http.get<Category[]>(`${API_BASE_URL}/category/all`, {
			withCredentials: true,
			responseType: 'json'
		})
	}

	addCategory(data: ApiInputs.CategoriesBasicSet) {
		return this.http.post<Category>(`${API_BASE_URL}/category/add`, data, {
			withCredentials: true
		})
	}

	deleteCategory(id: string) {
		return this.http.delete(`${API_BASE_URL}/category/${id}`, {
			withCredentials: true
		})
	}

	updateCategory(id: string, data: ApiInputs.CategoriesBasicSet) {
		return this.http.put<Category>(`${API_BASE_URL}/category/${id}`, data, {
			withCredentials: true
		})
	}

	reorderCategory(data: ApiInputs.ReorderCategoryData) {
		return this.http.put<ApiInputs.ReorderCategoryReturnData>(
			`${API_BASE_URL}/category/reorder`,
			data,
			{
				withCredentials: true
			}
		)
	}

	/* Category Groups */

	getAllCategoryGroups() {
		return this.http.get<CategoryGroup[]>(`${API_BASE_URL}/group/all`, {
			withCredentials: true,
			responseType: 'json'
		})
	}

	addCategoryGroups(data: ApiInputs.AddCategoryGroupInputs) {
		return this.http.post<CategoryGroup>(`${API_BASE_URL}/group/add`, data, {
			withCredentials: true
		})
	}

	deleteCategoryGroups(id: string) {
		return this.http.delete(`${API_BASE_URL}/group/${id}`, {
			withCredentials: true
		})
	}

	updateCategoryGroups(id: string, data: ApiInputs.AddCategoryGroupInputs) {
		return this.http.put<CategoryGroup>(`${API_BASE_URL}/group/${id}`, data, {
			withCredentials: true
		})
	}

	// reorderCategoryGroups(data: ApiInputs.ReorderCategoryData) {
	// 	return this.http.put<ApiInputs.ReorderCategoryReturnData>(
	// 		`${API_BASE_URL}/group/reorder`,
	// 		data,
	// 		{
	// 			withCredentials: true
	// 		}
	// 	)
	// }

	constructor(private http: HttpClient) {}
}
