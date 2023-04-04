import { Component, Input } from '@angular/core'
import { NotSyncStatus } from 'src/app/store/store.types'

@Component({
	selector: 'counter-not-sync-status-icon',
	templateUrl: './not-sync-status-icon.component.html'
})
export class NotSyncStatusIconComponent {
	@Input() status: NotSyncStatus | undefined = undefined

	get statusIsNotSynchronized() {
		return this.status === NotSyncStatus.NOT_SYNCHRONIZED
	}

	get statusIsSynchronization() {
		return this.status === NotSyncStatus.SYNCHRONIZATION
	}

	get statusIsError() {
		return this.status === NotSyncStatus.ERROR
	}
}
