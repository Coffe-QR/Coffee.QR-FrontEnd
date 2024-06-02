import { Component, OnInit } from '@angular/core'
import { JobApplicationService } from '../job-application.service'
import { ActivatedRoute, Router } from '@angular/router'
import { LocalUserService } from '../../Xuniversal/local-user.service'

@Component({
    selector: 'app-jobs-overview',
    templateUrl: './jobs-overview.component.html',
    styleUrls: ['./jobs-overview.component.scss'],
})
export class JobsOverviewComponent implements OnInit {
    jobApplications: any[] = []
    localId!: number

    constructor(
        private jobApplicationService: JobApplicationService,
        private route: ActivatedRoute,
        private router: Router,
        private localUserService: LocalUserService
    ) {}

    ngOnInit(): void {
        const userId = +this.route.snapshot.paramMap.get('userId')!
        if (userId) {
            this.localUserService
                .getLocalUserByUserId(userId)
                .subscribe((localUser) => {
                    this.localId = localUser.localId
                    this.fetchJobApplications()
                })
        } else {
            console.error('No userId parameter provided in the route.')
            // Handle the error case as appropriate for your application
        }
    }

    fetchJobApplications(): void {
        this.jobApplicationService
            .getJobApplicationsByLocal(this.localId)
            .subscribe({
                next: (applications) => {
                    this.jobApplications = applications
                },
                error: (error) =>
                    console.error('Error fetching job applications:', error),
            })
    }

    changeComponent(): void {
        this.router.navigate(['/job-report'])
    }
}
