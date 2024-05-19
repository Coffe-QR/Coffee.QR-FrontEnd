import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class GoogleFormService {
  private readonly formUrlKey = 'googleFormUrl';

  constructor(private sanitizer: DomSanitizer) {}

  setGoogleFormUrl(url: string): void {
    console.log('Setting Google Form URL:', url);
    localStorage.setItem(this.formUrlKey, url);
  }

  getGoogleFormUrl(): string | null {
    const url = localStorage.getItem(this.formUrlKey);
    console.log('Retrieved Google Form URL:', url);
    return url;
  }

  getSafeGoogleFormUrl(): SafeResourceUrl | null {
    const url = this.getGoogleFormUrl();
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  }
}
