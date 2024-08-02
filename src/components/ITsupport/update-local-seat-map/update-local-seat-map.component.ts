import { Component, OnInit } from '@angular/core'
import {
    ChartRendererConfigOptions,
    ChartDesignerConfigOptions,
} from '@seatsio/seatsio-types'
import { EmbeddableProps } from '@seatsio/seatsio-angular'
import { ActivatedRoute, Router } from '@angular/router' // Import the Router class
import { LocalService } from '../../Xuniversal/local.service'
import { SeatsioService } from '../../Xuniversal/seatsio.service'
import { TableService } from '../../Xuniversal/table.service'
import { TicketService } from '../../Xuniversal/ticket.service'
import { TicketEventService } from '../../Xuniversal/ticket-event.service'

@Component({
    selector: 'app-update-local-seat-map',
    templateUrl: './update-local-seat-map.component.html',
    styleUrls: ['./update-local-seat-map.component.scss'],
})
export class UpdateLocalSeatMapComponent implements OnInit {
    key: string = ''
    localId: number = 0
    showChart: boolean = false

    designerConfig: EmbeddableProps<ChartDesignerConfigOptions> = {
        region: 'eu',
        secretKey: '709f52bc-9892-4334-b511-99fe2a56646a',
        chartKey: '',
        onChartCreated: (chartKey) => {
            alert(this.key)
            if (this.key === null) {
                this.key = chartKey
                alert(this.key)
                alert(chartKey)
            }
        },
    }

    constructor(
        private router: Router,
        private localService: LocalService,
        private route: ActivatedRoute,
        private seatsioService: SeatsioService,
        private tableService: TableService,
        private ticketService: TicketService,
        private ticketEventService: TicketEventService
    ) {}

    ngOnInit(): void {
        this.localId = this.route.snapshot.params['localId']
        this.loadChart()
    }

    loadChart() {
        this.localService.getLocalById(this.localId).subscribe({
            next: (local) => {
                this.key = local.chartKey
                this.designerConfig.chartKey = this.key
                //alert(this.designerConfig.chartKey)
                this.initializeChart()
            },
            error: (error) => console.error('Error getting local:', error),
        })
    }

    initializeChart() {
        this.showChart = false
        setTimeout(() => {
            this.showChart = true
        }, 0)
    }

    // AKO JE this.key === null, onda napravi novu mapu i promeni isActive na true, ako vec postoji samo update radimo

    saveLocal() {
        if (this.key === '') {
            alert('Please create a chart first')
        } else {
            this.tableService.deleteTableByLocalId(this.localId).subscribe({
                next: (response) => console.log('Tables deleted:', response),
                error: (error) =>
                    console.error('Error deleting tables:', error),
            })

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

                                this.seatsioService
                                    .getChartCategories(this.key)
                                    .subscribe({
                                        next: (categories) => {
                                            Object.keys(categories).forEach(
                                                (key) => {
                                                    const category =
                                                        categories[key]
                                                    const ticketData = {
                                                        type: key,
                                                        price: 0,
                                                        note: 'default',
                                                        localId: this.localId,
                                                    }
                                                    this.ticketService
                                                        .createCard(ticketData)
                                                        .subscribe({
                                                            error: (error) =>
                                                                console.error(
                                                                    'Error creating ticket:',
                                                                    error
                                                                ),
                                                        })
                                                }
                                            )
                                        },
                                        error: (error) =>
                                            console.error(
                                                'Error getting chart categories:',
                                                error
                                            ),
                                    })

                                this.seatsioService
                                    .getChartDetails(this.key)
                                    .subscribe({
                                        next: (chartDetails) => {
                                            this.postDataToDatabase(
                                                chartDetails
                                            )
                                        },
                                        error: (error) =>
                                            console.error(
                                                'Error getting chart details:',
                                                error
                                            ),
                                    })

                                this.router.navigate(['/it-support'])
                            },
                            error: (error) =>
                                console.error('Error updating local:', error),
                        })
                },
                error: (error) => console.error('Error getting local:', error),
            })
        }
    }

    postDataToDatabase(chartDetails: any) {
        Object.keys(chartDetails).forEach((key) => {
            chartDetails[key].forEach((item: any) => {
                const tableData = {
                    name: item.labels.own.label, // Adjust according to your data structure
                    capacity: item.capacity,
                    isSmokingArea: false, // Adjust as needed
                    localId: this.localId,
                }
                this.tableService.createTable(tableData).subscribe({
                    next: (response) => console.log('Table created:', response),
                    error: (error) =>
                        console.error('Error creating table:', error),
                })
            })
        })
    }
}
