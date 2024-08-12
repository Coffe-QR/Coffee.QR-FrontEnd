import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../../auth/auth.service'
import { RentOfferService } from '../../Client/rent-offer.service'
import { LocalUserService } from '../../Xuniversal/local-user.service'
import { LocalService } from '../../Xuniversal/local.service'
import { EventService } from '../event.service'
import { switchMap, tap } from 'rxjs'
import { ToastrService } from 'ngx-toastr'

@Component({
    selector: 'app-review-rent-offers',
    templateUrl: './review-rent-offers.component.html',
    styleUrls: ['./review-rent-offers.component.scss'],
})
export class ReviewRentOffersComponent implements OnInit {
    userId: number = 0
    local: any
    rentOffers: any[] = []
    filteredRentOffers: any[] = []
    selectedStatus: string = 'SENT'
    selectedOffer: any

    constructor(
        private authService: AuthService,
        private rentOfferService: RentOfferService,
        private localUserService: LocalUserService,
        private localService: LocalService,
        private eventService: EventService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.userId = this.authService.user$.getValue().id

        this.localUserService.getLocalUserByUserId(this.userId).subscribe({
            next: (response) => {
                this.localService.getLocalById(response.localId).subscribe({
                    next: (localResponse) => {
                        this.local = localResponse
                        this.rentOfferService
                            .getRentOffersByLocalId(this.local.id)
                            .subscribe({
                                next: (rentOffersResponse) => {
                                    this.loadUserNames(rentOffersResponse)
                                },
                                error: (error) =>
                                    console.error(
                                        'Error getting rent offers:',
                                        error
                                    ),
                            })
                    },
                    error: (error) =>
                        console.error('Error getting local:', error),
                })
            },
            error: (error) => console.error('Error getting local user:', error),
        })
    }

    loadUserNames(rentOffers: any[]) {
        rentOffers.forEach((offer) => {
            this.authService.getUserById(offer.userId).subscribe({
                next: (userResponse) => {
                    offer.username = userResponse.username
                    this.rentOffers.push(offer)
                    this.filterRentOffers()
                },
                error: (error) =>
                    console.error('Error getting user info:', error),
            })
        })
    }

    filterRentOffers() {
        this.filteredRentOffers = this.rentOffers.filter(
            (offer) => offer.rentOfferStatus === this.selectedStatus
        )
    }

    setFilter(status: string) {
        this.selectedStatus = status
        this.filterRentOffers()
    }

    acceptOffer(offerId: number) {
        this.rentOfferService
            .acceptRentOffer(offerId)
            .pipe(
                switchMap(() =>
                    this.rentOfferService.getRentOfferById(offerId)
                ),
                tap((response) => {
                    this.selectedOffer = response
                    console.log('Selected offer:', this.selectedOffer)
                }),
                tap(() => {
                    const formattedDateTime = new Date(
                        this.selectedOffer.dateTime
                    ).toISOString()
                    console.log('Formatted DateTime:', formattedDateTime)

                    this.authService
                        .getUserById(this.selectedOffer.userId)
                        .subscribe({
                            next: (userResponse) => {
                                this.selectedOffer.username =
                                    userResponse.username
                                console.log(
                                    'Username:',
                                    this.selectedOffer.username
                                )

                                const eventData = {
                                    name:
                                        'RENT ' +
                                        this.selectedOffer.username +
                                        ' ' +
                                        formattedDateTime,
                                    dateTime: formattedDateTime,
                                    description: 'RENTED_TO_USER',
                                    image: '',
                                    userId: this.userId,
                                    localId: this.local.id,
                                }

                                console.log('Event Data:', eventData)

                                this.eventService
                                    .createRentEvent(eventData)
                                    .subscribe({
                                        next: () => {
                                            this.toastr.success(
                                                'Rent offer accepted, event created successfully'
                                            )
                                            this.reloadRentOffers() // Reload the rent offers after successful creation
                                        },
                                        error: (error) => {
                                            console.error(
                                                'Error creating event:',
                                                error
                                            )
                                            if (error.status === 400) {
                                                alert(
                                                    'Bad Request: ' +
                                                        JSON.stringify(
                                                            error.error
                                                        )
                                                )
                                            } else {
                                                alert(
                                                    'Unexpected error occurred. Please try again.'
                                                )
                                            }
                                        },
                                    })
                            },
                            error: (error) =>
                                console.error(
                                    'Error getting user info:',
                                    error
                                ),
                        })
                })
            )
            .subscribe({
                error: (error) =>
                    console.error('Error accepting rent offer:', error),
            })
    }

    declineOffer(offerId: number) {
        this.rentOfferService.declineRentOffer(offerId).subscribe({
            next: () => {
                this.updateOfferStatus(offerId, 'DECLINED')
                this.reloadRentOffers()
            },
            error: (error) =>
                console.error('Error declining rent offer:', error),
        })
    }

    reloadRentOffers() {
        this.rentOffers = [] // Clear current offers to avoid duplicates
        this.localUserService.getLocalUserByUserId(this.userId).subscribe({
            next: (response) => {
                this.localService.getLocalById(response.localId).subscribe({
                    next: (localResponse) => {
                        this.local = localResponse
                        this.rentOfferService
                            .getRentOffersByLocalId(this.local.id)
                            .subscribe({
                                next: (rentOffersResponse) => {
                                    this.loadUserNames(rentOffersResponse)
                                },
                                error: (error) =>
                                    console.error(
                                        'Error getting rent offers:',
                                        error
                                    ),
                            })
                    },
                    error: (error) =>
                        console.error('Error getting local:', error),
                })
            },
            error: (error) => console.error('Error getting local user:', error),
        })
    }

    updateOfferStatus(offerId: number, status: string) {
        const offer = this.rentOffers.find((o) => o.id === offerId)
        if (offer) {
            offer.rentOfferStatus = status
            this.filterRentOffers()
        }
    }
}
