import { Component } from '@angular/core'
import { ItemService } from '../item.service'
import { ReportService } from '../report.service'
import { Item } from '../../../auth/model/item.model'
import { Report } from '../../../auth/model/report.model'

@Component({
    selector: 'app-new-report',
    templateUrl: './new-report.component.html',
    styleUrls: ['./new-report.component.scss'],
})
export class NewReportComponent {
    constructor(
        private itemService: ItemService,
        private reportService: ReportService
    ) {}
    items: Report[] = [] // Ovde bi trebali dodati stvarne stavke
    filteredItems: Report[] = []
    searchQuery: string = ''
    selectedType: number | null = null
    selectedDate: string | null = null // Dodano za filtriranje
    sortOrder: 'asc' | 'desc' = 'asc' // Dodano za sortiranje

    ngOnInit(): void {
        this.reportService.getNewReport().subscribe({
            next: (response) => {
                this.items = response
                this.filteredItems = response
            },
            error: (error) => console.error('Error creating event:', error),
        })
    }

    filterItems() {
        this.filteredItems = this.items.filter((item) => {
            const matchesSearch = item.start
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase())
            const matchesDate = this.selectedDate
                ? item.start === this.selectedDate
                : true // Filtriranje po datumu
            return matchesSearch && matchesDate
        })
        this.sortItems() // Sortirajte nakon filtriranja
    }

    onSearchChange(event: Event) {
        const input = event.target as HTMLInputElement // Tipiziraj kao HTMLInputElement
        this.searchQuery = input.value // Sada možeš pristupiti value
        this.filterItems()
    }

    onDateChange(event: Event) {
        const input = event.target as HTMLInputElement
        this.selectedDate = input.value // Postavljanje odabranog datuma
        this.filterItems()
    }

    onSortChange(event: Event) {
        const select = event.target as HTMLSelectElement
        this.sortOrder = select.value as 'asc' | 'desc' // Postavljanje izabranog reda
        this.sortItems()
    }

    sortItems() {
        this.filteredItems.sort((a, b) => {
            const dateA = new Date(a.start).getTime()
            const dateB = new Date(b.start).getTime()
            return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA
        })
    }

    resetSearch() {
        this.searchQuery = ''
        this.selectedDate = null // Resetovanje datuma
        this.filteredItems = this.items // Ponovo postavljanje na sve stavke
    }

    recomend(itemId: any) {
        this.itemService.reccomend(itemId).subscribe()
        location.reload()
    }
}
