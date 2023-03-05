import { MenuItem } from './menu.types'

export const ICONS_PATH = 'assets/animated-icons'

export const MENU_ITEMS: MenuItem[] = [
	{
		id: 0,
		name: 'Home',
		path: '/',
		icon: 'home'
	},
	{
		id: 1,
		name: 'Categories',
		path: '/categories',
		icon: 'opened-folder'
	},
	{
		id: 2,
		name: 'Statistic',
		path: '/statistic',
		icon: 'combo-chart'
	}
]
