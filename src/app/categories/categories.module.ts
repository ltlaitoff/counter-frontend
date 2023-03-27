import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoriesComponent } from './categories.component'
import { AngularSvgIconModule } from 'angular-svg-icon'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
	declarations: [CategoriesComponent],
	imports: [CommonModule, ReactiveFormsModule, AngularSvgIconModule.forRoot()],
	exports: [CategoriesComponent]
})
export class CategoriesModule {}
