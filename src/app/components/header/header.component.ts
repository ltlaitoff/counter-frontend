import { Component, Input } from '@angular/core'
import { User } from 'src/types/User'

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent {
	@Input() userInfo: User | null = null

	menuOpened = false

	toggleMenuOpened() {
		this.menuOpened = !this.menuOpened
	}

	closeMenu() {
		this.menuOpened = false
	}
}
