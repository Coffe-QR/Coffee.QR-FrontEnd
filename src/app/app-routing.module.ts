import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from '../auth/login/login.component'
import { RegisterComponent } from '../auth/register/register.component'
import { BartenderLandingPageComponent } from '../components/Bartender/bartender-landing-page/bartender-landing-page.component'
import { ClientLandingPageComponent } from '../components/Client/client-landing-page/client-landing-page.component'
import { ManagerLandingPageComponent } from '../components/CofeeManager/manager-landing-page/manager-landing-page.component'
import { ItSupportLandingPageComponent } from '../components/ITsupport/it-support-landing-page/it-support-landing-page.component'
import { WaiterLandingPageComponent } from '../components/Waiter/waiter-landing-page/waiter-landing-page.component'
import { HomePageComponent } from '../components/Xuniversal/home-page/home-page.component'
import { AboutComponent } from '../components/Xuniversal/about/about.component'
import { AuthGuard } from '../auth/auth.guard'
import { WaiterGuard } from '../auth/waiter.guard'
import { ItSupportGuard } from '../auth/itsupport.guard'
import { ManagerGuard } from '../auth/manager.guard'
import { ClientGuard } from '../auth/client.guard'
import { BartenderGuard } from '../auth/bartender.guard'
import { ContactComponent } from '../components/Xuniversal/contact/contact.component'
import { CreateEventComponent } from '../components/CofeeManager/create-event/create-event.component'
import { SupplyCreateComponent } from '../components/CofeeManager/supply-create/supply-create.component'
import { SupplyStatusComponent } from '../components/Xuniversal/supply-status/supply-status.component'
import { SupplyDetailsComponent } from '../components/Xuniversal/supply-details/supply-details.component'
import { JobApplicationFormComponent } from '../components/Xuniversal/job-application-form/job-application-form.component'
import { EventsOverviewComponent } from '../components/CofeeManager/events-overview/events-overview.component'
import { MenuOverviewComponent } from '../components/Xuniversal/menu-overview/menu-overview.component'
import { CreateTableComponent } from '../components/CofeeManager/create-table/create-table.component'
import { NotificationOverviewComponent } from '../components/Waiter/notification-overview/notification-overview.component'
import { CreateLocalComponent } from '../components/ITsupport/create-local/create-local.component'
import { AllEventsOverviewComponent } from '../components/Xuniversal/all-events-overview/all-events-overview.component'

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
        data: { animation: 'Register' },
    },
    {
        path: 'login',
        component: LoginComponent,
        data: { animation: 'Login' },
    },
    {
        path: 'about',
        component: AboutComponent,
        //data: { animation: 'About' },
    },
    {
        path: 'contact',
        component: ContactComponent,
        //data: { animation: 'Contact' },
    },
    {
        path: 'menu-overview/:localId/:tableId',
        component: MenuOverviewComponent,
        //data: { animation: 'Menu' },
    },
    {
        path: 'all-events-overview',
        component: AllEventsOverviewComponent,
        data: { animation: 'AllEvents' },
    },

    //--------------------ROLES--------------------
    {
        path: 'bartender',
        component: BartenderLandingPageComponent,
        canActivate: [BartenderGuard],
    },
    {
        path: 'client',
        component: ClientLandingPageComponent,
        canActivate: [ClientGuard],
    },
    {
        path: 'manager',
        component: ManagerLandingPageComponent,
        canActivate: [ManagerGuard],
    },
    {
        path: 'create-event',
        component: CreateEventComponent,
        canActivate: [ManagerGuard],
    },
    {
        path: 'supply-create',
        component: SupplyCreateComponent,
        canActivate: [ManagerGuard],
    },
    {
        path: 'supply-status',
        component: SupplyStatusComponent,
        canActivate: [ManagerGuard],
    },
    {
        path: 'events-overview',
        component: EventsOverviewComponent,
        canActivate: [ManagerGuard],
    },
    {
        path: 'create-table',
        component: CreateTableComponent,
        canActivate: [ManagerGuard],
    },
    {
        path: 'supply-details/:supplyId',
        component: SupplyDetailsComponent,
    },
    {
        path: 'it-support',
        component: ItSupportLandingPageComponent,
        canActivate: [ItSupportGuard],
    },
    {
        path: 'create-local',
        component: CreateLocalComponent,
        canActivate: [ItSupportGuard],
    },
    {
        path: 'waiter',
        component: WaiterLandingPageComponent,
        canActivate: [WaiterGuard],
    },
    {
        path: 'job-application-form',
        component: JobApplicationFormComponent,
    },
    {
        path: 'notifications-overview',
        component: NotificationOverviewComponent,
        canActivate: [WaiterGuard],
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
