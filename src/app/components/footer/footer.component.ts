import { Component } from '@angular/core'
import { environment } from 'src/environments/environment'
import { GITHUB_CREATOR_ACCOUNT_LINK, USED_SOURCE_LINKS } from './footer.config'

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html'
})
export class FooterComponent {
	version = environment.version
	type = environment.type

	config = {
		creatorLink: GITHUB_CREATOR_ACCOUNT_LINK,
		sourceLinks: USED_SOURCE_LINKS
	}
}
