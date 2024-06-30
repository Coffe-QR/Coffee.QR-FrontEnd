import { Component, OnInit } from '@angular/core'
import {
    ChartRendererConfigOptions,
    ChartDesignerConfigOptions,
} from '@seatsio/seatsio-types'
import { EmbeddableProps } from '@seatsio/seatsio-angular'
import { ActivatedRoute, Router } from '@angular/router' // Import the Router class
import { LocalService } from '../../Xuniversal/local.service'

@Component({
    selector: 'app-create-local-seat-map',
    templateUrl: './create-local-seat-map.component.html',
    styleUrl: './create-local-seat-map.component.scss',
})
export class CreateLocalSeatMapComponent {
    key: string = ''
    localId: number = 0

    designerConfig: EmbeddableProps<ChartDesignerConfigOptions> = {
        region: 'eu',
        secretKey: '709f52bc-9892-4334-b511-99fe2a56646a',
        onChartCreated: (chartKey) => {
            console.log('Chart created:', chartKey)
            this.key = chartKey
        },
    }

    constructor(
        private router: Router,
        private localService: LocalService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.localId = this.route.snapshot.params['localId']
    }

    saveLocal() {
        if (this.key === '') {
            alert('Please create a chart first')
        } else {
            this.localService.getLocalById(this.localId).subscribe({
                next: (local) => {
                    console.log('Local:', local)
                    this.localService
                        .updateLocal({
                            id: local.id,
                            name: local.name,
                            city: local.city,
                            dateOfStartingPartnership:
                                local.dateOfStartingPartnership,
                            isActive: true,
                            chartKey: this.key,
                        })
                        .subscribe({
                            next: (response) => {
                                console.log('Local updated:', response)
                                //this.router.navigate(['/it-support'])
                            },
                            error: (error) =>
                                console.error('Error updating local:', error),
                        })
                },
                error: (error) => console.error('Error getting local:', error),
            })
        }
    }
}
