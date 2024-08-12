import { Component, OnInit } from '@angular/core'
import { LocalService } from '../../Xuniversal/local.service'

@Component({
    selector: 'app-locals-overview',
    templateUrl: './locals-overview.component.html',
    styleUrls: ['./locals-overview.component.scss'],
})
export class LocalsOverviewComponent implements OnInit {
    locals: any[] = []

    constructor(private localService: LocalService) {}

    ngOnInit(): void {
        this.localService.getAllLocals().subscribe((locals) => {
            this.locals = locals
            console.log(locals)
        })
    }
}
