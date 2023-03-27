import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home-page/home-page.component'
import { CategoriesModule } from '../categories/categories.module'
import { StatisticModule } from '../statistic/statistic.module'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
	declarations: [HomeComponent],
	imports: [
		CommonModule,
		CategoriesModule,
		StatisticModule,
		ReactiveFormsModule
	],
	exports: [HomeComponent]
})
export class HomeModule {}
