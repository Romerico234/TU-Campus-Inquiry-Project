import { Injectable } from '@angular/core';
import { InquiryData } from '../models/inquiry-data.models';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  // Object to track invalid fields
  invalidFields = {
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    campus: false,
  };

  validateForm(inquiry: InquiryData): boolean {
    this.resetInvalidFields();

    let isValid = true;

    // The following code checks if the form field is provided (and if the email form field follows the correct format)
    if (!inquiry.firstName) {
      this.invalidFields.firstName = true;
      isValid = false;
    }

    if (!inquiry.lastName) {
      this.invalidFields.lastName = true;
      isValid = false;
    }

    if (!inquiry.email) {
      this.invalidFields.email = true;
      isValid = false;
    } else if (!this.isEmailValid(inquiry.email)) {
      this.invalidFields.email = true;
      isValid = false;
    }

    if (!inquiry.phone) {
      this.invalidFields.phone = true;
      isValid = false;
    }

    if (!inquiry.campus) {
      this.invalidFields.campus = true;
      isValid = false;
    }

    return isValid;
  }

  resetInvalidFields(): void {
    this.invalidFields = {
      firstName: false,
      lastName: false,
      email: false,
      phone: false,
      campus: false,
    };
  }
  
  isEmailValid(email: string | undefined): boolean {
    if (!email) return false;
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return emailPattern.test(email);
  }
}
