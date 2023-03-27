import { Component, Input } from '@angular/core'
import { User } from 'src/types/User'
import { AuthGuardService } from '../../services/auth-guard.service'

@Component({
	selector: 'user-panel',
	templateUrl: './user-panel.component.html'
})
export class UserPanelComponent {
	constructor(private authGuard: AuthGuardService) {}

	@Input() userInfo: User | null = null

	isOpened = false

	private toggleDropdownOpened() {
		this.isOpened = !this.isOpened
	}

	private closeDropdown() {
		this.isOpened = false
	}

	onBadgeClick() {
		this.toggleDropdownOpened()
	}

	onExitClick() {
		this.authGuard.unauthorize()
		this.closeDropdown()
	}

	closeWithChecks() {
		if (this.userInfo === null) return
		if (this.isOpened === false) return

		this.closeDropdown()
	}
}
