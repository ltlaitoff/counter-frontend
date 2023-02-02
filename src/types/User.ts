export interface UserBase {
	_id: string
	email: string
	family_name: string
	given_name: string
	name: string
	picture: string
}

export interface User extends UserBase {
	authorized: boolean
}
