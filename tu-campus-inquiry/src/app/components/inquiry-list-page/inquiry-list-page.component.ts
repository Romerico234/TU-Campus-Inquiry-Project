import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InquiryData } from '../../shared/models/inquiry-data.models';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-inquiry-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inquiry-list-page.component.html',
  styleUrl: './inquiry-list-page.component.css'
})

/* Not doing validation for this page because authorized users can only it */
export class InquiryListPageComponent implements OnInit {
  inquiries: InquiryData[] = [];
  editingInquiryId: string | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Fetches all the inquiries from the database
    this.dataService.getInquiries().subscribe((items: any) => {
      this.inquiries = items;
    });
  }

  // Function to mark if an inquiry is complete/incomplete 
  toggleCompletion(inquiry: InquiryData) {
    if (inquiry._id) {
      const newCompletionStatus = !inquiry.completed;
      this.dataService
        .toggleInquiryCompletion(inquiry._id, newCompletionStatus)
        .subscribe(() => {
          inquiry.completed = newCompletionStatus;
        });
    }
  }

  deleteInquiry(inquiry: InquiryData) {
    if (inquiry._id) {
      this.dataService.deleteInquiry(inquiry._id).subscribe(
        () => {
          this.inquiries = this.inquiries.filter(
            (item) => item._id !== inquiry._id
          );
        },
        (err) => { console.error('Error deleting inquiry:', err); }
      );
    }
  }

  editInquiry(inquiryId: string | undefined): void { if (inquiryId) { this.editingInquiryId = inquiryId; } }

  saveInquiry(inquiry: InquiryData): void {
    inquiry.created_at = new Date(); // Set the created_at field to the current date and time
    this.dataService.updateInquiry(inquiry).subscribe(
      () => {
        this.editingInquiryId = null;
      },
      (err) => { console.error('Error updating inquiry:', err); }
    );
  }

  // Function to format the created_at field into a string
  formatDate(date: Date): string {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // months are 0-based, so add 1
    const day = dateObj.getDate();
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    const second = dateObj.getSeconds();

    const padZero = (num: number) => (num < 10 ? '0' : '') + num;

    return `${year}-${padZero(month)}-${padZero(day)} ${padZero(hour)}:${padZero(minute)}:${padZero(second)}`;
  }
}
