import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DragDropModule } from '@angular/cdk/drag-drop'

import { CategoriesPageComponent } from './categories-page/categories-page.component'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ClickedOutsideDirectiveModule } from 'src/app/directives/clicked-outside-directive.module'
import { KeydownDirectiveModule } from 'src/app/directives/keydown-directive.module'
import { CategorySelectComponent } from './category-select/category-select.component'
import { ButtonsModule } from '../buttons/buttons.module'
import { LoadStatusButtonModule } from 'src/app/components-modules/load-status-button/load-status-button.module'
import { CategoriesTableComponent } from './categories-table/categories-table.component'
import { CategoriesFormComponent } from './categories-form-add-new/categories-form.component'
import { NotSyncStatusIconModule } from '../../components-modules/not-sync-status-icon/not-sync-status-icon.module'
import { CategoriesTableColorHeadItemComponent } from './categories-table/categories-table-color-head-item/categories-table-color-head-item.component'

import { LottieModule } from 'ngx-lottie'
import { TableControlsModule } from '../../components-modules/table-controls/table-controls.module'
import { CategorySelectDropdownComponent } from './category-select/category-select-dropdown/category-select-dropdown.component'
import { HighlightPipe } from './category-select/highlight.pipe'

// Factory funtion needed ngx-lottie
export function playerFactory() {
	return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web')
}

@NgModule({
	declarations: [
		CategoriesPageComponent,
		CategorySelectComponent,
		CategoriesTableComponent,
		CategoriesFormComponent,
		CategoriesTableColorHeadItemComponent,
		CategorySelectDropdownComponent,
		HighlightPipe
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		AngularSvgIconModule.forRoot(),
		ClickedOutsideDirectiveModule,
		KeydownDirectiveModule,
		ButtonsModule,
		LoadStatusButtonModule,
		NotSyncStatusIconModule,
		LottieModule.forRoot({ player: playerFactory }),
		TableControlsModule,
		DragDropModule
	],
	exports: [CategoriesPageComponent, CategorySelectComponent]
})
export class CategoriesModule {}
