import { NgModule, isDevMode } from '@angular/core'
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
import { AuthorizationComponent } from './pages/authorization/authorization.component'
import { HeaderComponent } from './components/header/header.component'

import { environment } from 'src/environments/environment'

import { AngularSvgIconModule } from 'angular-svg-icon'
import { LoaderComponent } from './components/loader/loader.component'
import { StoreModule } from '@ngrx/store'
import { PerfComponent } from './pages/perf/perf.component'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'

import { StoreEffects, StoreReducers } from './store/'
import { MenuComponent } from './components/menu/menu.component'

import { LottieModule } from 'ngx-lottie'
import { LogoComponent } from './components/logo/logo.component'
import { LogoItemComponent } from './components/logo/logo-item/logo-item.component'
import { FooterComponent } from './components/footer/footer.component'
import { StatisticLogComponent } from './components/statistic-log/statistic-log.component'

import { UserPanelModule } from './components/user-panel/user-panel.module'
import { ClickedOutsideDirectiveModule } from './directives/clicked-outside-directive.module'
import { CategoriesModule } from './modules/categories/categories.module'
import { StatisticModule } from './modules/statistic/statistic.module'

// Factory funtion needed ngx-lottie
export function playerFactory() {
	return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web')
}

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		AuthorizationComponent,
		HeaderComponent,
		LoaderComponent,
		PerfComponent,
		MenuComponent,
		LogoComponent,
		LogoItemComponent,
		FooterComponent,
		StatisticLogComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		SocialLoginModule,
		ReactiveFormsModule,
		AngularSvgIconModule.forRoot(),
		StoreModule.forRoot(StoreReducers),
		EffectsModule.forRoot(StoreEffects),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
		LottieModule.forRoot({ player: playerFactory }),
		UserPanelModule,
		ClickedOutsideDirectiveModule,
		CategoriesModule,
		StatisticModule
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
