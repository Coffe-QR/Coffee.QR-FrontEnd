import { Component, OnInit } from '@angular/core'
import { LocalService } from '../../Xuniversal/local.service'
import { Router } from '@angular/router'
import { AuthService } from '../../../auth/auth.service'
import { LocalUserService } from '../../Xuniversal/local-user.service'
import { UploadService } from '../../../shared/upload.service'

@Component({
    selector: 'app-create-local',
    templateUrl: './create-local.component.html',
    styleUrls: ['./create-local.component.scss'],
})
export class CreateLocalComponent implements OnInit {
    // id: number
    // name: string
    // city: string
    // dateOfStartingPartnership: string // DateOnly is not available in TypeScript, use string instead
    // isActive: boolean

    localName: string = ''
    localCity: string = ''
    localDateOfStartingPartnership: string = ''
    managerId: number = 0
    managers: any[] = []
    localId: number = 0
    localLogo: string = ''
    //localIsActive: boolean = true

    constructor(
        private localService: LocalService,
        private router: Router,
        private authService: AuthService,
        private localUserService: LocalUserService,
        private uploadService: UploadService
    ) {}

    ngOnInit(): void {
        this.authService.getAllManagersWithoutLocal().subscribe({
            next: (response) => {
                this.managers = response
                console.log('Managers:', response)
            },
            error: (error) => console.error('Error getting managers:', error),
        })
    }

    onSubmit(): void {
        const localData = {
            name: this.localName,
            city: this.localCity,
            dateOfStartingPartnership: this.localDateOfStartingPartnership,
            isActive: false,
            logo: this.localLogo,
        }

        this.localService.createLocal(localData).subscribe({
            next: (response) => {
                // this.router.navigate(['/it-support'])
                // console.log('Local created:', response)
                this.localId = response.id
                const localUserData = {
                    localId: response.id,
                    userId: this.managerId,
                }

                this.localUserService.createLocalUser(localUserData).subscribe({
                    next: (response) => {
                        this.router.navigate([
                            '/create-local-seat-map/',
                            this.localId,
                        ])
                        console.log('Local user created:', response)
                    },
                    error: (error) =>
                        console.error('Error creating local user:', error),
                })
            },
            error: (error) => console.error('Error creating local:', error),
        })
    }

    onFileSelected(logo: any): void {
        const file: File = logo.target.files[0]

        if (file) {
            this.uploadService.uploadImage(file).subscribe({
                next: (response) => {
                    this.localLogo = response.path
                },
                error: (error) => {
                    console.error('Error uploading image:', error)
                },
            })
        }
    }
}
