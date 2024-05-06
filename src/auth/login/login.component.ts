import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../auth.service'
import { Login } from '../model/login.model'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    isDisabled: boolean = false

    constructor(
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService
    ) {}

    loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    })

    showSpinner(): void {
        this.isDisabled = true
        setTimeout(() => {
            this.login()
        }, 700)
    }

    login(): void {
        const login: Login = {
            username: this.loginForm.value.username || '',
            password: this.loginForm.value.password || '',
        }

        if (this.loginForm.valid) {
            //this.isDisabled = true
            this.authService.login(login).subscribe({
                next: () => {
                    if (this.authService.user$.value.role === 'client') {
                        this.router.navigate(['/client'])
                    } else if (
                        this.authService.user$.value.role === 'bartender'
                    ) {
                        this.router.navigate(['/bartender'])
                    } else if (
                        this.authService.user$.value.role === 'manager'
                    ) {
                        this.router.navigate(['/manager'])
                    } else if (
                        this.authService.user$.value.role === 'itsupport'
                    ) {
                        this.router.navigate(['/it-support'])
                    } else if (this.authService.user$.value.role === 'waiter') {
                        this.router.navigate(['/waiter'])
                    } else {
                        this.router.navigate(['/'])
                    }

                    this.toastr.success('Login successful')
                    this.isDisabled = false
                },
                error: (err) => {
                    this.toastr.error('Please try again', 'Login failed')
                    this.isDisabled = false
                },
            })
        } else {
            this.toastr.error('Please enter username and password')
            this.isDisabled = false
        }
    }

    navigateToRegister() {
        this.router.navigate(['/register'])
    }

    forgetPassword() {}

    // ngOnInit() {
    //   const backgrounds = [
    //     './assets/landing1.jpg',
    //     './assets/landing2.jpg',
    //     './assets/landing3.jpg',
    //   ];

    //   this.preloadImages(backgrounds);
    //   // Select a random background image
    //   const randomIndex = Math.floor(Math.random() * backgrounds.length);
    //   this.backgroundImage = backgrounds[randomIndex];
    // }

    // preloadImages(imageArray: string[]) {
    //   imageArray.forEach((image) => {
    //     const img = new Image();
    //     img.src = image;
    //   });
    // }
}
