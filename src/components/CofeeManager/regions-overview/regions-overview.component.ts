import { Component, OnInit } from '@angular/core'
import { RegionService } from '../region-service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
    selector: 'app-regions-overview',
    templateUrl: './regions-overview.component.html',
    styleUrl: './regions-overview.component.scss',
})
export class RegionsOverviewComponent implements OnInit {
    regions: any[] = []
    menuId: number = 0
    newRegionName: string = ''

    constructor(
        private regionService: RegionService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.menuId = this.route.snapshot.params['menuId']

        this.fetchRegionsByMenuId()
    }

    fetchRegionsByMenuId() {
        this.regionService.getAllRegionsByMenuId(this.menuId).subscribe({
            next: (response) => {
                console.log(response)
                this.regions = response
            },
            error: (error) => console.error('Error getting regions:', error),
        })
    }

    deleteRegion(regionId: number): void {
        this.regionService.deleteRegion(regionId).subscribe({
            next: (response) => {},
            error: (error) => console.error('Error deleting region:', error),
        })
    }

    seeItems(regionId: number): void {
        this.router.navigate(['/regions-items-overview', regionId])
    }

    onSubmit(): void {
        console.log('submit')
        const data = {
            name: this.newRegionName,
            menuId: this.menuId,
        }

        this.regionService.createRegion(data).subscribe({
            next: (response) => {
                this.fetchRegionsByMenuId()
            },
            error: (error) => console.error('Error creating region:', error),
        })
    }
}
