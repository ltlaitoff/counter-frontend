import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { RootState } from 'src/app/store'
import { selectNotSyncStatisticWithCategory } from 'src/app/store/statistic/statistic.select'
import { StatisticNotSyncStateItemWithCategory } from 'src/app/store/statistic/statistic.types'
import { NotSyncStatus } from 'src/app/store/store.types'

type LocalStateItem = StatisticNotSyncStateItemWithCategory & {
	isSuccess?: never
	isSuccessStatus?: never
}

type LocalStateItemNotSync = StatisticNotSyncStateItemWithCategory & {
	isSuccess: boolean
	isSuccessStatus: string | null
}

@Component({
	selector: 'counter-statistic-log',
	templateUrl: './statistic-log.component.html',
	styleUrls: ['./statistic-log.component.scss']
})
export class StatisticLogComponent {
	constructor(private store: Store<RootState>) {}

	notSyncStatistic: LocalStateItem[] | null = []

	notSyncStatisticSuccessesItems: LocalStateItemNotSync[] = []

	statusColors = {
		[NotSyncStatus.NOT_SYNCHRONIZED]: '#d4d4d8',
		[NotSyncStatus.SYNCHRONIZATION]: '#fde68a',
		[NotSyncStatus.ERROR]: '#fca5a5',
		success: '#86efac'
	}

	ngOnInit() {
		this.store.select(selectNotSyncStatisticWithCategory).subscribe(value => {
			this.updateNoSyncLocalState(value)
			console.log(JSON.stringify(value))
		})
	}

	getTimeForOutput(value: number) {
		// TODO: Func transform seconds to time-string
		const absNumberValueInSeconds = Math.abs(value)

		const output = new Date(absNumberValueInSeconds * 1000)

		console.log(output.toLocaleTimeString('en-GB', { timeZone: 'UTC' }))

		return output.toLocaleTimeString('en-GB', { timeZone: 'UTC' })
	}

	private updateNoSyncLocalState(newState: LocalStateItem[]) {
		if (!this.notSyncStatistic) {
			this.notSyncStatistic = [...newState]
			return
		}

		const deletedItems = this.notSyncStatistic.map(item => {
			const newStateItem = newState.find(data => data._id === item._id)

			if (!newStateItem) {
				return item
			}

			return null
		})

		const filtered = deletedItems.filter(v => v !== null) as LocalStateItem[]

		this.addNewSuccesedItems(filtered)

		this.notSyncStatistic = []
		this.notSyncStatistic.push(...newState)
	}

	private addNewSuccesedItems = (items: LocalStateItem[]) => {
		const newItems: LocalStateItemNotSync[] = items.map(item => ({
			...item,
			isSuccess: true,
			isSuccessStatus: null
		}))

		newItems.forEach(item => {
			setTimeout(() => {
				item.isSuccessStatus = 'deleting'

				setTimeout(() => {
					this.deleteNewSuccesedItem(item._id)
				}, 500)
			}, 2000)
		})

		this.notSyncStatisticSuccessesItems = [
			...this.notSyncStatisticSuccessesItems,
			...newItems
		]
	}

	private deleteNewSuccesedItem = (id: string) => {
		this.notSyncStatisticSuccessesItems =
			this.notSyncStatisticSuccessesItems.filter(item => item._id !== id)
	}

	get stasticItems(): (LocalStateItem | LocalStateItemNotSync)[] {
		return [
			...this.notSyncStatisticSuccessesItems,
			...(this.notSyncStatistic || [])
		]
	}
}
