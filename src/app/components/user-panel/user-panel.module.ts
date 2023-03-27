import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserPanelComponent } from './user-panel.component'
import { UserPanelPlugComponent } from './user-panel-plug/user-panel-plug.component'
import { UserPanelOpenButtonComponent } from './user-panel-open-button/user-panel-open-button.component'
import { UserPanelFormComponent } from './user-panel-form/user-panel-form.component'
import { UserPanelFormItemComponent } from './user-panel-form-item/user-panel-form-item.component'
import { UserPanelFormDividerComponent } from './user-panel-form-divider/user-panel-form-divider.component'
import { ClickedOutsideDirectiveModule } from 'src/app/directives/clicked-outside-directive.module'
import { KeydownDirectiveModule } from '../../directives/keydown-directive.module'

@NgModule({
	declarations: [
		UserPanelComponent,
		UserPanelPlugComponent,
		UserPanelOpenButtonComponent,
		UserPanelFormComponent,
		UserPanelFormItemComponent,
		UserPanelFormDividerComponent
	],
	imports: [
		CommonModule,
		ClickedOutsideDirectiveModule,
		KeydownDirectiveModule
	],
	exports: [UserPanelComponent]
})
export class UserPanelModule {}
