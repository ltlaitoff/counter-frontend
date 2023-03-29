import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoriesPageComponent } from './categories-page/categories-page.component'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { ReactiveFormsModule } from '@angular/forms'
import { ClickedOutsideDirectiveModule } from 'src/app/directives/clicked-outside-directive.module'
import { KeydownDirectiveModule } from 'src/app/directives/keydown-directive.module'
import { CategorySelectComponent } from './category-select/category-select.component'
import { ButtonsModule } from '../buttons/buttons.module'
import { LoadStatusButtonModule } from 'src/app/components-modules/load-status-button/load-status-button.module'
import { CategoriesTableComponent } from './categories-table/categories-table.component'
import { CategoriesFormAddNewComponent } from './categories-form-add-new/categories-form-add-new.component'
import { NotSyncStatusIconModule } from '../../components-modules/not-sync-status-icon/not-sync-status-icon.module'
import { CategoriesTableControlsComponent } from './categories-table-controls/categories-table-controls.component'
import { CategoriesTableColorHeadItemComponent } from './categories-table/categories-table-color-head-item/categories-table-color-head-item.component'

import { LottieModule } from 'ngx-lottie'

// Factory funtion needed ngx-lottie
export function playerFactory() {
	return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web')
}

@NgModule({
	declarations: [
		CategoriesPageComponent,
		CategorySelectComponent,
		CategoriesTableComponent,
		CategoriesFormAddNewComponent,
		CategoriesTableControlsComponent,
		CategoriesTableColorHeadItemComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		AngularSvgIconModule.forRoot(),
		ClickedOutsideDirectiveModule,
		KeydownDirectiveModule,
		ButtonsModule,
		LoadStatusButtonModule,
		NotSyncStatusIconModule,
		LottieModule.forRoot({ player: playerFactory })
	],
	exports: [CategoriesPageComponent, CategorySelectComponent]
})
export class CategoriesModule {}
