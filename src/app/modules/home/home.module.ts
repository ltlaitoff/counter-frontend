import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomePageComponent } from './home-page/home-page.component'
import { CategoriesModule } from '../categories/categories.module'
import { StatisticModule } from '../statistic/statistic.module'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
	declarations: [HomePageComponent],
	imports: [
		CommonModule,
		CategoriesModule,
		StatisticModule,
		ReactiveFormsModule
	],
	exports: [HomePageComponent]
})
export class HomeModule {}
