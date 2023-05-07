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
import { CategoriesTableControlComponent } from './categories-table-control/categories-table-control.component'
import { PanelFormModule } from '../../components-modules/panel-form/panel-form.module'
import { CategoryGroupsModule } from '../category-groups/category-groups.module'
import { CategorySelectDropdownDividerComponent } from './category-select/category-select-dropdown-divider/category-select-dropdown-divider.component'
import { CategorySelectDropdownCategoryItemComponent } from './category-select/category-select-dropdown-category-item/category-select-dropdown-category-item.component'
import { CategorySelectDropdownFooterComponent } from './category-select/category-select-dropdown-footer/category-select-dropdown-footer.component'
import { CategorySelectDropdownTabComponent } from './category-select/category-select-dropdown-tab/category-select-dropdown-tab.component'
import { CategorySelectDropdownCategoryTabComponent } from './category-select/tabs/category-select-dropdown-category-tab/category-select-dropdown-category-tab.component'
import { CategorySelectDropdownGroupTabComponent } from './category-select/tabs/category-select-dropdown-group-tab/category-select-dropdown-group-tab.component'
import { ColorModule } from '../color/color.module'

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
		HighlightPipe,
		CategoriesTableControlComponent,
		CategorySelectDropdownDividerComponent,
		CategorySelectDropdownCategoryItemComponent,
		CategorySelectDropdownFooterComponent,
		CategorySelectDropdownTabComponent,
		CategorySelectDropdownCategoryTabComponent,
		CategorySelectDropdownGroupTabComponent
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
		DragDropModule,
		PanelFormModule,
		CategoryGroupsModule,
		ColorModule
	],
	exports: [CategoriesPageComponent, CategorySelectComponent]
})
export class CategoriesModule {}
