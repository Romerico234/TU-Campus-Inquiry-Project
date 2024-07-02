import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InquiryData } from '../../shared/models/inquiry-data.models';
import { ValidationService } from '../../shared/services/validation.service';

@Component({
  selector: 'app-inquiry-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inquiry-form.component.html',
})
export class InquiryFormComponent implements OnInit {
  inquiry: InquiryData = {};
  submitted = false;

  constructor(
    private router: Router,
    private validationService: ValidationService
  ) {}

  ngOnInit(): void { }

  submitInquiry(form: any): void {
    this.submitted = true;

    // Function to validate the form. It does not let them submit until all form fields are valid
    if (this.validationService.validateForm(this.inquiry)) {
      this.inquiry.created_at = new Date(); 
      this.inquiry.completed = false;

      // If all form fields are valid, navigate to the confirmation route (confirmation component)
      this.router.navigate(['/confirmation'], {
        queryParams: { inquiry: JSON.stringify(this.inquiry), }
      });
    }
  }

  get invalidFields() { return this.validationService.invalidFields; }

  isEmailValid(email: string): boolean { return this.validationService.isEmailValid(email); }
}
