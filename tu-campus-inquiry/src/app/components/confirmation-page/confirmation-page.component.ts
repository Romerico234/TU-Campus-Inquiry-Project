import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../../shared/services/data.service';
import { InquiryData } from '../../shared/models/inquiry-data.models';
import { EmailService } from '../../shared/services/email.service';
import { ValidationService } from '../../shared/services/validation.service';

@Component({
  selector: 'app-confirmation-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './confirmation-page.component.html',
})
export class ConfirmationPageComponent implements OnInit {
  inquiry: InquiryData = {};
  editingField: string | null = null;
  saved = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private emailService: EmailService,
    private validationService: ValidationService
  ) {}

  ngOnInit(): void {
    // Load inquiry data from inquiry-form route (inquiry-form component)
    this.route.queryParams.subscribe((params) => {
      const inquiryData = params['inquiry'];
      if (inquiryData) {
        this.inquiry = JSON.parse(inquiryData);
        this.validationService.validateForm(this.inquiry);
      }
    });
  }

  // Selects the form field that is being edited
  editField(field: string): void { this.editingField = field; }

  // Checks if a form field is being editted 
  isFieldEditing(field: string): boolean { return this.editingField === field; }

  // Cancels the edit
  cancelEdit(): void { this.editingField = null; }

  // Save changes to a form field
  saveChanges(): void {
    if (this.editingField) {
      if (this.validationService.validateForm(this.inquiry)) {
        // Update the local data only
        console.log('Field updated successfully');
        this.saved = true;
        this.editingField = null;
      } else { console.log('Validation failed for field:', this.editingField); }
    }
  }

  // Submits inquiry only if all form fields are valid
  submitAndSendConfirmationEmail(): void {
    if (this.validationService.validateForm(this.inquiry)) {
      this.dataService.addInquiry(this.inquiry).subscribe(
        (res: InquiryData) => {
          this.saved = true;

          // Details regarding email 
          const companyEmail = 'tucampusinquiry@outlook.com';
          let emailBody = `
            Thank you for your request regarding our campus services. We have received your request and our team will review it shortly. Below are the details you provided:
  
            First Name: ${this.inquiry.firstName}
            Last Name: ${this.inquiry.lastName} 
            Email: ${this.inquiry.email}
            Phone Number: ${this.inquiry.phone}
            Campus: ${this.inquiry.campus}
            `;

          if (this.inquiry.workshopResponse) { emailBody += `Workshop Request: ${this.inquiry.workshopResponse}`; }

          emailBody += `\nWe appreciate your interest and will get back to you soon with more information. If you have any further questions or need immediate assistance, please feel free to contact us at ${companyEmail}.`;

          // Sends confirmation email to user
          this.emailService.sendEmail(
              this.inquiry.email!,
              'TU Campus Inquiry Request Confirmation',
              emailBody
            )
            .subscribe(
              () => {
                console.log('Email sent successfully!');
                this.router.navigateByUrl('/submission');
              },
              (err) => { console.log('Error sending email:', err); }
            );
        },
        (err) => { console.error('Error occurred while submitting the form', err); }
      );
    }
  }

  get invalidFields() { return this.validationService.invalidFields; }

  get allFieldsValid(): boolean { return Object.values(this.invalidFields).every((field) => !field); }

  isEmailValid(email: string): boolean { return this.validationService.isEmailValid(email); }
}
