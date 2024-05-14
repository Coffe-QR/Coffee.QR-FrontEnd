import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobApplicationService } from '../job-application-form.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-job-application-form',
  templateUrl: './job-application-form.component.html',
  styleUrls: ['./job-application-form.component.scss']
})
export class JobApplicationFormComponent implements OnInit {
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    phone: string = '';
    position: number = 0;
    dateOfBirth: string = '';
    address: string = '';
    applicationDate: string =  Date.now().toString();
    localId: number = 1;
    applicantDescription: string = '';


  locals: any[] = [];  // Array to store locals data

  constructor(
    private authService: AuthService,
    private jobApplicationService: JobApplicationService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    //this.fetchLocals();  // Simulate fetching locals from a service
  }
 
  fetchLocals() {
    // Simulate fetching data from backend
    this.locals = [
      { id: 1, name: 'Local 1' },
      { id: 2, name: 'Local 2' },
      // More locals can be added here
    ];
  }
/*
  onSubmit(): void {
    if (this.jobApplicationForm.valid) {
      this.jobApplicationService.createJobApplication(this.jobApplicationForm.value).subscribe({
        next: (response) => this.router.navigate(['/success']),
        error: (error) => console.error('Failed to submit application:', error),
      });
    }
  }
  */

  onSubmit(): void {
    alert("radi");
    const jobData = {
        id: -1,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        dateOfBirth: this.dateOfBirth,
        address: this.address,
        localId: this.localId,
        position: this.position,
        applicantDescription: this.applicantDescription,
        applicationDate: "2024-05-14",

    }

    this.jobApplicationService.createJobApplication(jobData).subscribe({
        next: (response) => alert("uspeo sam"),
        error: (error) => console.error('Error creating jobApplication:', error),
    })
}
  getPosition(position: number): string {
    switch (position) {
        case 0:
            return 'Waiter'
        case 1:
            return 'Bartender'
        case 2:
            return 'Chef'
        case 3:
            return 'Manager'
        default:
            return 'Unknown'
    }
}

//   submitApplication(): void {
//     this.onSubmit();  // This can be an alias to onSubmit or can contain additional logic if needed
//   }
}
