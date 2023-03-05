import { AnimationOptions } from 'ngx-lottie'

export interface MenuItem {
	id: number
	name: string
	path: string
	icon: string
}

export type AnimationOptionsWithId = AnimationOptions & { id: number }

export enum AnimationSetStatusTypes {
	PLAY = 'play',
	STOP = 'stop'
}
