import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'

import {
	SocialLoginModule,
	SocialAuthServiceConfig,
	GoogleLoginProvider
} from '@abacritt/angularx-social-login'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './pages/home/home.component'
import { CategoriesComponent } from './pages/categories/categories.component'
import { StatisticComponent } from './pages/statistic/statistic.component'
import { AuthorizationComponent } from './pages/authorization/authorization.component'
import { HeaderComponent } from './components/header/header.component'

import { environment } from 'src/environments/environment'
import { CategorySelectComponent } from './pages/home/category-select/category-select.component'

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		CategoriesComponent,
		StatisticComponent,
		AuthorizationComponent,
		HeaderComponent,
		CategorySelectComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		SocialLoginModule,
		ReactiveFormsModule
	],
	providers: [
		{
			provide: 'SocialAuthServiceConfig',
			useValue: {
				autoLogin: false,
				providers: [
					{
						id: GoogleLoginProvider.PROVIDER_ID,
						provider: new GoogleLoginProvider(environment.googleClientId, {
							oneTapEnabled: false
						})
					}
				],
				onError: err => {
					console.error(err)
				}
			} as SocialAuthServiceConfig
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
