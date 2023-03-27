import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoriesPageComponent } from './categories-page/categories-page.component'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
	declarations: [CategoriesPageComponent],
	imports: [CommonModule, ReactiveFormsModule, AngularSvgIconModule.forRoot()],
	exports: [CategoriesPageComponent]
})
export class CategoriesModule {}
