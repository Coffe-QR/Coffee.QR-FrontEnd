import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TicketService } from '../../Xuniversal/ticket.service'
import { AuthService } from '../../../auth/auth.service'
import { EventService } from '../event.service'
import { LocalUserService } from '../../Xuniversal/local-user.service'
import { LocalService } from '../../Xuniversal/local.service'
import { SeatsioService } from '../../Xuniversal/seatsio.service'
import { ToastrService } from 'ngx-toastr'
import { take, tap } from 'rxjs'
import { TicketEventService } from '../../Xuniversal/ticket-event.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-ticket-for-event',
  templateUrl: './create-ticket-for-event.component.html',
  styleUrl: './create-ticket-for-event.component.scss'
})
export class CreateTicketForEventComponent {
  userId: number = 0
  events: any[] = []

  ticketType: string = ''
  ticketPrice: any = null
  ticketNote: string = ''
  ticketEventId: any

  localId: number = 0
  localChartKey: string = ''

  submitAttempted = false

  constructor(
      private authService: AuthService,
      private ticketService: TicketService,
      private eventService: EventService,
      private router: Router,
      private localUserService: LocalUserService,
      private localService: LocalService,
      private seatsioService: SeatsioService,
      private toastrService: ToastrService,
      private ticketEventService: TicketEventService,
      private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
      this.userId = this.authService.user$.getValue().id

      this.ticketEventId = this.route.snapshot.params['eventId']

      this.eventService.getAllEventsByUserId(this.userId).subscribe({
          next: (response: any) => {
              this.events = response
          },
          error: (error) => console.error('Error getting events:', error),
      })

      this.localUserService.getLocalUserByUserId(this.userId).subscribe({
          next: (response: any) => {
              this.localService.getLocalById(response.localId).subscribe({
                  next: (response1: any) => {
                      this.localId = response1.id
                      this.localChartKey = response1.chartKey
                  },
                  error: (error) =>
                      console.error('Error getting local:', error),
              })
          },
          error: (error) => console.error('Error getting local user:', error),
      })
  }

  onSubmit(): void {
      const ticketData = {
          type: this.ticketType,
          note: this.ticketNote,
          localId: this.localId,
      }

      const categoryData = {
          chartKey: this.localChartKey,
          categoryKeyName: this.ticketType,
      }

      this.submitAttempted = true
      if (this.ticketPrice <= 0) {
          return
      }

      this.seatsioService.createCategory(categoryData).subscribe({
          next: () => {
              this.ticketService.createCard(ticketData).subscribe({
                  next: (response) => {
                      const ticketEventData = {
                          cardId: response.id,
                          price: this.ticketPrice,
                          eventId: this.ticketEventId,
                      }

                      this.ticketEventService
                          .createCardEvent(ticketEventData)
                          .subscribe({
                              next: () => {

                                this.openAlert();
                                  // this.router.navigate([
                                  //     `/manage-event-tickets/${this.ticketEventId}`,
                                  // ])
                                  this.toastrService.success(
                                      'Ticket created successfully!'
                                  )
                              },
                              error: (error) =>
                                  console.error(
                                      'Error creating ticket event:',
                                      error
                                  ),
                          })
                  },
                  error: (error) =>
                      console.error('Error creating ticket:', error),
              })
          },
          error: (error) => console.error('Error creating category:', error),
      })
  }

  openAlert() {
    Swal.fire({
      title: 'Do you want to make a new ticket or proceed to manage tickets?',
      showDenyButton: true,
      confirmButtonText: 'Make New Ticket',
      denyButtonText: 'Manage Tickets',
      confirmButtonColor: '#44403c', 
      denyButtonColor: '#44403c', 
      background: '#f8f9fa', 
      color: '#333',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ticketType = '';
        this.ticketPrice = null;
        this.submitAttempted = false;
        this.ticketNote = '';
      } else if (result.isDenied) {
        this.router.navigate(['manage-event-tickets/', this.ticketEventId]) 
      }
    });
  }

}
