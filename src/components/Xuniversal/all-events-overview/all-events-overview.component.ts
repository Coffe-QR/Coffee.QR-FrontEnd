import { Component, OnInit } from '@angular/core'
import { EventService } from '../../CofeeManager/event.service'
import { LocalService } from '../local.service'
import { forkJoin, Observable } from 'rxjs'
import { mergeMap, map } from 'rxjs/operators'
import { Event } from '../../../auth/model/event.model'

interface LocalNameMap {
    [id: number]: string
}

@Component({
    selector: 'app-all-events-overview',
    templateUrl: './all-events-overview.component.html',
    styleUrls: ['./all-events-overview.component.scss'],
})
export class AllEventsOverviewComponent implements OnInit {
    events: Event[] = []

    constructor(
        private eventService: EventService,
        private localService: LocalService
    ) {}

    ngOnInit(): void {
        this.fetchEventsWithLocalNames()
    }

    fetchEventsWithLocalNames(): void {
        this.eventService
            .getAllEvents()
            .pipe(
                mergeMap((events: Event[]): Observable<Event[]> => {
                    const localIds = events.map((event) => event.localId)
                    return this.getLocalNamesByIds(localIds).pipe(
                        map((localNamesMap: LocalNameMap) => {
                            return events.map((event) => ({
                                ...event,
                                localName:
                                    localNamesMap[event.localId] ||
                                    'Name not found',
                            }))
                        })
                    )
                })
            )
            .subscribe(
                (eventsWithLocals: Event[]) => {
                    console.log('Events with locals:', eventsWithLocals)
                    this.events = eventsWithLocals
                },
                (err) => console.error('Failed to load events:', err)
            )
    }

    getLocalNamesByIds(localIds: number[]): Observable<LocalNameMap> {
        const uniqueIds = Array.from(new Set(localIds)) // Remove duplicates
        const requests = uniqueIds.map((id) =>
            this.localService
                .getLocalById(id)
                .pipe(map((local) => ({ id, name: local.name })))
        )
        return forkJoin(requests).pipe(
            map((results) => {
                const localNamesMap: LocalNameMap = {}
                results.forEach((result) => {
                    localNamesMap[result.id] = result.name
                })
                return localNamesMap
            })
        )
    }
}
