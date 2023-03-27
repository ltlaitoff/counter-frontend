import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserInfoComponent } from './user-panel.component'
import { UserPanelPlugComponent } from './user-panel-plug/user-panel-plug.component'
import { UserPanelOpenButtonComponent } from './user-panel-open-button/user-panel-open-button.component'
import { UserPanelFormComponent } from './user-panel-form/user-panel-form.component'

@NgModule({
	declarations: [
		UserInfoComponent,
		UserPanelPlugComponent,
		UserPanelOpenButtonComponent,
		UserPanelFormComponent
	],
	imports: [CommonModule],
	exports: [UserInfoComponent]
})
export class UserPanelModule {}
