import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoryGroupsCellComponent } from './category-groups-cell/category-groups-cell.component'
import { CategoryGroupsItemComponent } from './category-groups-item/category-groups-item.component'
import { CategoryGroupsFormComponent } from './category-groups-form/category-groups-form.component'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { ClickedOutsideDirectiveModule } from 'src/app/directives/clicked-outside-directive.module'
import { KeydownDirectiveModule } from 'src/app/directives/keydown-directive.module'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { CategoryGroupsAddChangeFormComponent } from './category-groups-add-change-form/category-groups-add-change-form.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

@NgModule({
	declarations: [
		CategoryGroupsCellComponent,
		CategoryGroupsItemComponent,
		CategoryGroupsFormComponent,
		CategoryGroupsAddChangeFormComponent
	],
	imports: [
		CommonModule,
		AngularSvgIconModule,
		ClickedOutsideDirectiveModule,
		KeydownDirectiveModule,
		DragDropModule,
		ReactiveFormsModule,
		FormsModule
	],
	exports: [CategoryGroupsCellComponent]
})
export class CategoryGroupsModule {}
