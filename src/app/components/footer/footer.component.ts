import { Component } from '@angular/core'
import { environment } from 'src/environments/environment'

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html'
})
export class FooterComponent {
	version = environment.version
}
