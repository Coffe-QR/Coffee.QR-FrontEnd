import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './login/login.component'
import { ReactiveFormsModule } from '@angular/forms'
import { RegisterComponent } from './register/register.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
    declarations: [LoginComponent, RegisterComponent],
    imports: [CommonModule, ReactiveFormsModule, SharedModule],
    exports: [LoginComponent],
})
export class AuthModule {}
