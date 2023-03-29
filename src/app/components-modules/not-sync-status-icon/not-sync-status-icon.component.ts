import { Component, Input } from '@angular/core'
import { Status } from 'src/app/store/categories/not-sync/categories-not-sync.types'

@Component({
	selector: 'counter-not-sync-status-icon',
	templateUrl: './not-sync-status-icon.component.html'
})
export class NotSyncStatusIconComponent {
	@Input() status: Status | undefined = undefined

	get statusIsNotSynchronized() {
		return this.status === Status.NOT_SYNCHRONIZED
	}

	get statusIsSynchronization() {
		return this.status === Status.SYNCHRONIZATION
	}

	get statusIsError() {
		return this.status === Status.ERROR
	}
}
