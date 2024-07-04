import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // URL endpoint for sending emails
  private emailUrl = `${environment.apiUrl}/inquiries/send-email`; 

  // Inject the HttpClient service
  constructor(private http: HttpClient) { }

  // Method to send an email
  sendEmail(to: string, subject: string, text: string) {
    // Information to be sent in the request body
    const data = {
      email: to,
      subject: subject,
      message: text
    };

    // Make a POST request to the email sending endpoint
    return this.http.post(this.emailUrl, data);
  }
}
