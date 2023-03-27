import { LoadStatus } from 'src/app/store/store.types'

export const ICONS = {
	[LoadStatus.NOT_SYNCHRONIZED]: 'assets/icons-png/help.png',
	[LoadStatus.SYNCHRONIZATION]: 'assets/icons-png/upgrade.png',
	[LoadStatus.ERROR]: 'assets/icons-png/cancel.png',
	[LoadStatus.SYNCHRONIZED]: 'assets/icons-png/ok.png'
}
