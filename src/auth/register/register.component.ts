import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Registration } from '../model/registration.model'
import { last } from 'rxjs'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    isDisabled: boolean = false

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit(): void {}

    registrationForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        role: new FormControl('', Validators.required),
    })

    register(): void {
        const registration: Registration = {
            username: this.registrationForm.value.username || '',
            email: this.registrationForm.value.email || '',
            password: this.registrationForm.value.password || '',
            firstname: this.registrationForm.value.firstname || '',
            lastname: this.registrationForm.value.lastname || '',
            role: Number(this.registrationForm.value.role),
        }

        if (this.registrationForm.valid) {
            this.isDisabled = true
            this.authService.register(registration).subscribe({
                next: () => {
                    this.router.navigate(['/login'])
                    this.isDisabled = false
                },
                error: (err) => {
                    this.isDisabled = false
                },
            })
        } else {
        }
    }
    navigateToLogin() {
        this.router.navigate(['/login'])
    }

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
