import { Component, Input } from '@angular/core'
import { User } from 'src/types/User'

@Component({
	selector: 'app-user-info',
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
	@Input() userInfo: User | null = null
}
