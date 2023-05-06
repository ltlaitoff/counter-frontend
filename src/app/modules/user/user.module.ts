import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserPanelComponent } from './user-panel/user-panel.component'
import { UserPanelPlugComponent } from './user-panel/user-panel-plug/user-panel-plug.component'
import { UserPanelOpenButtonComponent } from './user-panel/user-panel-open-button/user-panel-open-button.component'
import { UserPanelFormComponent } from './user-panel/user-panel-form/user-panel-form.component'

import { ClickedOutsideDirectiveModule } from 'src/app/directives/clicked-outside-directive.module'
import { KeydownDirectiveModule } from 'src/app/directives/keydown-directive.module'
import { PanelFormModule } from 'src/app/components-modules/panel-form/panel-form.module'

@NgModule({
	declarations: [
		UserPanelComponent,
		UserPanelPlugComponent,
		UserPanelOpenButtonComponent,
		UserPanelFormComponent
	],
	imports: [
		CommonModule,
		ClickedOutsideDirectiveModule,
		KeydownDirectiveModule,
		PanelFormModule
	],
	exports: [UserPanelComponent]
})
export class UserModule {}
