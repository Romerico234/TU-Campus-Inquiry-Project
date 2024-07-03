import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InquiryData } from '../../shared/models/inquiry-data.models';
import { ValidationService } from '../../shared/services/validation.service';
import { DataService } from '../../shared/services/data.service';


@Component({
  selector: 'app-inquiry-form-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inquiry-form-page.component.html',
})
export class InquiryFormPageComponent implements OnInit {
  inquiry: InquiryData = {};
  submitted = false;

  constructor(
    private router: Router,
    private validationService: ValidationService,
    private dataService: DataService
  ) {}

  ngOnInit(): void { }

  submitInquiry(form: any): void {
    this.submitted = true;

    // Function to validate the form. It does not let them submit until all form fields are valid
    if (this.validationService.validateForm(this.inquiry)) {
      this.inquiry.created_at = new Date(); 
      this.inquiry.completed = false;

      // Store the inquiry data temporarily
      this.dataService.setTemporaryInquiryData(this.inquiry);

      // Navigate to the confirmation route (confirmation component)
      this.router.navigate(['/confirmation-page']);
    }
  }

  get invalidFields() { return this.validationService.invalidFields; }

  isEmailValid(email: string): boolean { return this.validationService.isEmailValid(email); }
}
