import { AnimationOptions } from 'ngx-lottie'
import { ICONS_PATH } from './menu.config'
import { AnimationOptionsWithId, MenuItem } from './menu.types'

const defaultAnimateOptions: AnimationOptions = {
	autoplay: false
}

export const getAnimationOptions = (
	menuItems: MenuItem[]
): AnimationOptionsWithId[] => {
	return menuItems.map(item => ({
		name: String(item.id),
		...defaultAnimateOptions,
		id: item.id,
		path: `${ICONS_PATH}/${item.icon}.json`
	}))
}
