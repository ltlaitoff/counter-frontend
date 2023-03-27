import { Component, Input } from '@angular/core'
import { User } from 'src/types/User'
import { AuthGuardService } from '../../../services/auth-guard.service'

@Component({
	selector: 'app-user-panel',
	templateUrl: './user-panel.component.html'
})
export class UserInfoComponent {
	constructor(private authGuard: AuthGuardService) {}

	@Input() userInfo: User | null = null

	isOpened = true

	clickedOutside() {
		if (this.userInfo === null) return
		if (this.isOpened === false) return

		this.isOpened = false
	}

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
}
