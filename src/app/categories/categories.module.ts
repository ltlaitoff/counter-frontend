import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoriesPageComponent } from './categories-page/categories-page.component'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { ReactiveFormsModule } from '@angular/forms'
import { ClickedOutsideDirectiveModule } from 'src/app/directives/clicked-outside-directive.module'
import { KeydownDirectiveModule } from '../directives/keydown-directive.module'
import { CategorySelectComponent } from './category-select/category-select.component'

@NgModule({
	declarations: [CategoriesPageComponent, CategorySelectComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		AngularSvgIconModule.forRoot(),
		ClickedOutsideDirectiveModule,
		KeydownDirectiveModule
	],
	exports: [CategoriesPageComponent, CategorySelectComponent]
})
export class CategoriesModule {}
