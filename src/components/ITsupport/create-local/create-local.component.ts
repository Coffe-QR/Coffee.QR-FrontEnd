import { Component, OnInit } from '@angular/core'
import { LocalService } from '../../Xuniversal/local.service'
import { Router } from '@angular/router'

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
    //localIsActive: boolean = true

    constructor(
        private localService: LocalService,
        private router: Router
    ) {}

    ngOnInit(): void {
        // Initialization logic goes here
    }

    onSubmit(): void {
        const localData = {
            name: this.localName,
            city: this.localCity,
            dateOfStartingPartnership: this.localDateOfStartingPartnership,
            isActive: true,
        }

        this.localService.createLocal(localData).subscribe({
            next: (response) => {
                this.router.navigate(['/it-support'])
                console.log('Local created:', response)
            },
            error: (error) => console.error('Error creating local:', error),
        })
    }
}
