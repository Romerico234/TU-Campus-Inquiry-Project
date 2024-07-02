import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // URL endpoint for the sending emails
  private emailUrl = 'http://localhost:3000/api/inquiries/send-email'; 

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
