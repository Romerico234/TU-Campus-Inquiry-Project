import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounselorData } from '../../shared/models/counselor-data';
import { counselors } from '../../../assets/counselors';

@Component({
  selector: 'meet-counselors-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meet-counselors-page.component.html',
  styleUrls: ['./meet-counselors-page.component.css'],
})
export class MeetCounselorsPageComponent implements OnInit {
  freshmanCounselors: CounselorData[] = [];
  transferCounselors: CounselorData[] = [];
  internationalCounselorsInfo: string = '';

  ngOnInit() {
    this.freshmanCounselors = counselors.freshmanCounselors;
    this.transferCounselors = counselors.transferCounselors;
    this.internationalCounselorsInfo = counselors.internationalCounselorsInfo;
  }
}
