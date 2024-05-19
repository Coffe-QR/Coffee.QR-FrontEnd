import { Component, OnInit } from '@angular/core';
import { JobApplicationService } from '../job-application.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jobs-overview',
  templateUrl: './jobs-overview.component.html',
  styleUrls: ['./jobs-overview.component.scss']
})
export class JobsOverview implements OnInit {
  jobApplications: any[] = [];
  localId!: number;

  constructor(
    private jobApplicationService: JobApplicationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const localIdParam = this.route.snapshot.paramMap.get('localId');
    if (localIdParam !== null) {
      this.localId = +localIdParam;
      this.fetchJobApplications();
    } else {
      console.error('No localId parameter provided in the route.');
      // Handle the error case as appropriate for your application
    }
  }

  fetchJobApplications(): void {
    this.jobApplicationService.getJobApplicationsByLocal(this.localId).subscribe({
      next: (applications) => {
        this.jobApplications = applications;
      },
      error: (error) => console.error('Error fetching job applications:', error)
    });
  }
}
