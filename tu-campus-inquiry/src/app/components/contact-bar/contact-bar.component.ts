import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-bar.component.html',
  styleUrl: './contact-bar.component.css'
})
export class ContactBarComponent { 
  showContactBar: boolean = true;
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      const currentUrl = this.router.url;
      this.showContactBar = !(
        currentUrl.includes('/db-admin/login') ||
        currentUrl.includes('/db-admin/list-of-inquiries')
      );
    });
  }


}
