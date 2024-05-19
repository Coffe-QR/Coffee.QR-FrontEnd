import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { GoogleFormService } from '../google-form.service';
import { Subscription } from 'rxjs';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-google-form',
  templateUrl: './google-form.component.html',
  styleUrls: ['./google-form.component.scss']
})
export class GoogleFormComponent implements OnInit, OnDestroy {
  isManager: boolean = false;
  googleFormUrl: string = '';
  safeGoogleFormUrl: SafeResourceUrl | null = null;
  private userSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private googleFormService: GoogleFormService) {}

  ngOnInit(): void {
    console.log('GoogleFormComponent initialized'); // Log initialization
    this.userSubscription = this.authService.user$.subscribe(user => {
      console.log('User data received in component:', user); // Log user data received
      this.isManager = (user.role === 'manager');
      console.log('isManager set to:', this.isManager); // Log the isManager value

      // Retrieve the Google Form URL from the service
      this.googleFormUrl = this.googleFormService.getGoogleFormUrl() || '';
      this.safeGoogleFormUrl = this.googleFormService.getSafeGoogleFormUrl();
      console.log('Initial Google Form URL:', this.googleFormUrl); // Log initial URL
      console.log('Initial Safe Google Form URL:', this.safeGoogleFormUrl); // Log initial safe URL
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  postGoogleFormUrl(): void {
    // Store the Google Form URL using the service
    this.googleFormService.setGoogleFormUrl(this.googleFormUrl);
    this.safeGoogleFormUrl = this.googleFormService.getSafeGoogleFormUrl();
    console.log('Google Form URL posted:', this.googleFormUrl);

    // Optionally show a confirmation
    alert('Google Form URL posted: ' + this.googleFormUrl);
  }

  updateGoogleFormUrl(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.googleFormUrl = inputElement.value;
    console.log('Updated Google Form URL:', this.googleFormUrl); // Log updated URL
  }
}
