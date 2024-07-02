// Interface representing the data structure for an inquiry
export interface InquiryData {
  // All fields are optional
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  campus?: string;
  workshopResponse?: string;
  completed?: boolean;
  created_at?: Date;
}
