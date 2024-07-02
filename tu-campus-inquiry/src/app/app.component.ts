import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatboxComponent } from './components/chatbox/chatbox.component';
import { ContactBarComponent } from './components/contact-bar/contact-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ChatboxComponent, ContactBarComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor() {
    // Clear login status on application initialization
    localStorage.removeItem('isLoggedIn');
  }
  
  title = 'tu-campus-inquiry-request';
}
