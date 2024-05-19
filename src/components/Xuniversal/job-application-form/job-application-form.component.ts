import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobApplicationService } from '../job-application-form.service';
import { AuthService } from '../../../auth/auth.service';
import { LocalService } from '../local.service';

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
    applicationDate: string = '';
    localId: number = 0;
    applicantDescription: string = '';
    locals: { id: number, name: string }[] = [];


  

  constructor(
    private authService: AuthService,
    private jobApplicationService: JobApplicationService,
    private router: Router,
    private localService: LocalService
  ) {}
  
  ngOnInit(): void {
    this.fetchLocals();  // Simulate fetching locals from a service
  }
 
  fetchLocals() {
  this.localService.getAllLocals().subscribe({
    next: (locals) => {
      console.log('Fetched locals:', locals); // Log fetched data
      this.locals = locals;
      // Set default localId to the first local's id if it's not set
      if (this.locals.length > 0 && this.localId === 0) {
        this.localId = this.locals[0].id; // Update the localId property
      }
    },
    error: (error) => console.error('Error fetching locals:', error)
  });
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
        applicationDate: this.getCurrentDate(),

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
  getCurrentDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  getLocalNameById(id: number): string {
    const local = this.locals.find(l => l.id === id);
    return local ? local.name : 'Unknown';
  }
}

//   submitApplication(): void {
//     this.onSubmit();  // This can be an alias to onSubmit or can contain additional logic if needed
//   }

