import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/Xuniversal/login/login.component';
import { RegisterComponent } from '../components/Xuniversal/register/register.component';
import { BartenderLandingPageComponent } from '../components/Bartender/bartender-landing-page/bartender-landing-page.component';
import { ClientLandingPageComponent } from '../components/Client/client-landing-page/client-landing-page.component';
import { ManagerLandingPageComponent } from '../components/CofeeManager/manager-landing-page/manager-landing-page.component';
import { ItSupportLandingPageComponent } from '../components/ITsupport/it-support-landing-page/it-support-landing-page.component';
import { WaiterLandingPageComponent } from '../components/Waiter/waiter-landing-page/waiter-landing-page.component';
import { HomePageComponent } from '../components/Xuniversal/home-page/home-page.component';

const routes: Routes = [
  // Home
  { path: '', component: HomePageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  // Bartender // canActivate: [BartenderGuard]
  { path: 'bartender', component: BartenderLandingPageComponent },

  // Client // canActivate: [ClientGuard]
  { path: 'client', component: ClientLandingPageComponent },

  // Manager // canActivate: [ManagerGuard]
  { path: 'manager', component: ManagerLandingPageComponent },

  // IT Support // canActivate: [ItSupportGuard]
  { path: 'it-support', component: ItSupportLandingPageComponent },

  // Waiter // canActivate: [WaiterGuard]
  { path: 'waiter', component: WaiterLandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
