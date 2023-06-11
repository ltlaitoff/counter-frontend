import { Component, Input } from '@angular/core'
import { User } from 'src/types/User'

import { LOGO_ITEMS } from './logo.config'
import { LogoItem } from './logo.types'

@Component({
	selector: 'app-logo',
	templateUrl: './logo.component.html'
})
export class LogoComponent {
	@Input() userInfo: User | null = null

	logoItems: LogoItem[]

	constructor() {
		this.logoItems = LOGO_ITEMS
	}
}
