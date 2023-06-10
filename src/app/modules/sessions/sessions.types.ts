export interface UserSession {
	_id: string
	expires: string
	cookie: {
		expires: string
	}
	authorized: string
	userId: string
	browserName: string
	browserVersion: string
	osName: string
	osVersion: string
	osVersionName: string
	userAgent: string
	platformType: string
	dateOfCreate: number
}
