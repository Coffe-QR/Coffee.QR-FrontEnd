import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { RegisterComponent } from '../auth/register/register.component'
import { BartenderLandingPageComponent } from '../components/Bartender/bartender-landing-page/bartender-landing-page.component'
import { ClientLandingPageComponent } from '../components/Client/client-landing-page/client-landing-page.component'
import { ManagerLandingPageComponent } from '../components/CofeeManager/manager-landing-page/manager-landing-page.component'
import { ItSupportLandingPageComponent } from '../components/ITsupport/it-support-landing-page/it-support-landing-page.component'
import { WaiterLandingPageComponent } from '../components/Waiter/waiter-landing-page/waiter-landing-page.component'
import { NavbarComponent } from '../components/Xuniversal/navbar/navbar.component'
import { HomePageComponent } from '../components/Xuniversal/home-page/home-page.component'
import { AboutComponent } from '../components/Xuniversal/about/about.component'
import { AuthModule } from '../auth/auth.module' // Import AuthModule here
import { SharedModule } from '../shared/shared.module'
import { ToastrModule } from 'ngx-toastr'

@NgModule({
    declarations: [AppComponent, NavbarComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AuthModule,
        SharedModule,
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
            countDuplicates: true,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'decreasing',
            timeOut: 3000,
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
