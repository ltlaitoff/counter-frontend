import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomePageComponent } from './modules/home/home-page/home-page.component'
import { CategoriesPageComponent } from './modules/categories/categories-page/categories-page.component'
import { StatisticComponent } from './modules/statistic/statistic-page/statistic-page.component'
import { AuthorizationComponent } from './pages/authorization/authorization.component'
import { PerfComponent } from './pages/perf/perf.component'
import { categoriesResolver } from './resolvers/category.resolver'
import { colorResolver } from './resolvers/color.resolver'
import { statisticResolver } from './resolvers/statistic.resolver'
import { categoryGroupsResolver } from './resolvers/category-groups.resolver'
import { authGuard } from './guards/auth.guard'

const routes: Routes = [
	{
		path: '',
		component: HomePageComponent,
		canActivate: [authGuard],
		resolve: [colorResolver, categoryGroupsResolver, categoriesResolver]
	},
	{
		path: 'categories',
		component: CategoriesPageComponent,
		canActivate: [authGuard],
		resolve: [colorResolver, categoryGroupsResolver, categoriesResolver]
	},
	{
		path: 'statistic',
		component: StatisticComponent,
		canActivate: [authGuard],
		resolve: [
			colorResolver,
			categoryGroupsResolver,
			categoriesResolver,
			statisticResolver
		]
	},
	{
		path: 'authorization',
		canActivate: [authGuard],
		component: AuthorizationComponent
	},
	{
		path: 'perf',
		component: PerfComponent
	},
	{
		path: '',
		redirectTo: '/',
		pathMatch: 'full'
	}
]

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
