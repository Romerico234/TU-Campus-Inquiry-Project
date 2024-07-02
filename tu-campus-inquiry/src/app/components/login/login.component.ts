import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login(): void {
    const validUsername = 'admin';
    const validPassword = 'password123';

    // If the entered username and passwords matches, redirect them to the inquiries route (inquiry-list component)
    if (this.username === validUsername && this.password === validPassword) {
      sessionStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/inquiries']);
    } else { alert('Invalid credentials'); }
  }
}
