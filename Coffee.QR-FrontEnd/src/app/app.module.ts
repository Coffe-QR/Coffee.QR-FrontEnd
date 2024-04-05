import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from '../components/Xuniversal/register/register.component';
import { LoginComponent } from '../components/Xuniversal/login/login.component';
import { BartenderLandingPageComponent } from '../components/Bartender/bartender-landing-page/bartender-landing-page.component';
import { ClientLandingPageComponent } from '../components/Client/client-landing-page/client-landing-page.component';
import { ManagerLandingPageComponent } from '../components/CofeeManager/manager-landing-page/manager-landing-page.component';
import { ItSupportLandingPageComponent } from '../components/ITsupport/it-support-landing-page/it-support-landing-page.component';
import { WaiterLandingPageComponent } from '../components/Waiter/waiter-landing-page/waiter-landing-page.component';
import { NavbarComponent } from '../components/Xuniversal/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    BartenderLandingPageComponent,
    ClientLandingPageComponent,
    ManagerLandingPageComponent,
    ItSupportLandingPageComponent,
    WaiterLandingPageComponent,
    NavbarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
