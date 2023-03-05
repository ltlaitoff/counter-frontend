import { Component } from '@angular/core'
import { environment } from '../../environments/environment.development'

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html'
})
export class FooterComponent {
	version = environment.version
}
