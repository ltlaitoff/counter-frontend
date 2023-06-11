import { Component, Input } from '@angular/core'
import { User } from 'src/types/User'
import { AuthGuardService } from 'src/app/services/auth-guard.service'
import { Router } from '@angular/router'

@Component({
	selector: 'user-panel',
	templateUrl: './user-panel.component.html'
})
export class UserPanelComponent {
	constructor(private authGuard: AuthGuardService, private router: Router) {}

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

	onClick(value: 'exit' | 'sessions') {
		switch (value) {
			case 'exit':
				return this.onExitClick()
			case 'sessions':
				return this.onSessionsClick()
		}
	}

	private onExitClick() {
		this.authGuard.unauthorize()
		this.closeDropdown()
	}

	private onSessionsClick() {
		this.router.navigate(['sessions'])

		this.closeDropdown()
	}

	closeWithChecks() {
		if (this.userInfo === null) return
		if (this.isOpened === false) return

		this.closeDropdown()
	}
}
