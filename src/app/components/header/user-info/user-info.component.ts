import { Component, Input } from '@angular/core'
import { User } from 'src/types/User'
import { AuthGuardService } from '../../../services/auth-guard.service'

@Component({
	selector: 'app-user-info',
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
	constructor(private authGuard: AuthGuardService) {}

	@Input() userInfo: User | null = null

	isOpened = false

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
