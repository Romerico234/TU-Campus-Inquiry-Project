import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InquiryData } from '../models/inquiry-data.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // API URL for the data
  private apiUrl = 'http://localhost:3000/api/inquiries';

  constructor(private http: HttpClient) { }

  // Fetch data from the API
  getInquiries() {
    return this.http.get(this.apiUrl);
  }

  // Fetch data from ID
  getInquiryById(id: any): Observable<InquiryData> {
    return this.http.get<InquiryData>(`${this.apiUrl}/${id}`);
  }

  // Add data to the API
  addInquiry(data: InquiryData): Observable<InquiryData> {
    return this.http.post<InquiryData>(this.apiUrl, data);
  }

  // Update data in the API
  updateInquiry(data: InquiryData) {
    return this.http.put(`${this.apiUrl}/${data._id}`, data);
  }

  // Delete data from the API
  deleteInquiry(id: any) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Mark inquiry as complete
  markInquiryAsComplete(id: string) {
    return this.http.put(`${this.apiUrl}/${id}`, { completed: true });
  }

  // Mark inquiry as complete/incomplete
  toggleInquiryCompletion(id: string, completedValue: boolean) {
    return this.http.put(`${this.apiUrl}/${id}`, { completed: completedValue });
  }
}
