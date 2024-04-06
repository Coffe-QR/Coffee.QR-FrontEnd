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

// Placeholder for the guard imports
// import { BartenderGuard } from 'path-to-guard';
// Similar imports for other guards...

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomePageComponent,
    //data: { animation: 'HomePage' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { animation: 'RegisterPage' },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'LoginPage' },
  },
  {
    path: 'bartender',
    component: BartenderLandingPageComponent,
    // canActivate: [BartenderGuard],
  },
  {
    path: 'client',
    component: ClientLandingPageComponent,
    // canActivate: [ClientGuard],
  },
  {
    path: 'manager',
    component: ManagerLandingPageComponent,
    // canActivate: [ManagerGuard],
  },
  {
    path: 'it-support',
    component: ItSupportLandingPageComponent,
    // canActivate: [ItSupportGuard],
  },
  {
    path: 'waiter',
    component: WaiterLandingPageComponent,
    // canActivate: [WaiterGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
