import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { RootState } from 'src/app/store'
import { StatisticTypes } from 'src/app/store/statistic'
import { selectNotSyncStatistic } from 'src/app/store/statistic/not-sync/statistic-not-sync.select'
import { Status } from 'src/app/store/statistic/not-sync/statistic-not-sync.types'

type LocalStateItem =
	StatisticTypes.NotSyncTypes.StateItemWithDefaultStatistic & {
		isSuccess?: never
		isSuccessStatus?: never
	}

type LocalStateItemNotSync =
	StatisticTypes.NotSyncTypes.StateItemWithDefaultStatistic & {
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

	notSyncStatistic: LocalStateItem[] | null = null
	notSyncStatisticSuccessesItems: LocalStateItemNotSync[] = []

	statusColors = {
		[Status.NOT_SYNCHRONIZED]: '#d4d4d8',
		[Status.SYNCHRONIZATION]: '#fde68a',
		[Status.ERROR]: '#fca5a5',
		success: '#86efac'
	}

	ngOnInit() {
		this.store.select(selectNotSyncStatistic).subscribe(value => {
			this.updateNoSyncLocalState(value)
		})
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
