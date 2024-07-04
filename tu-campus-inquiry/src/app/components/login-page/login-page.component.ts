import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { loginConfig } from '../../../environments/login-config';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  adminCredentials = {
    username: '',
    password: ''
  };

  errorMessage: string | null = null;

  constructor(private router: Router) {}

  login(): void {
    const validUsername = loginConfig.validUsername;
    const validPassword = loginConfig.validPassword;

    // If the entered username and passwords matches, redirect them to the inquiries route (inquiry-list component)
    if (this.adminCredentials.username === validUsername && this.adminCredentials.password === validPassword) {
      sessionStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/admin/list-of-inquiries']);
    } else {
      this.errorMessage = 'Invalid credentials';
    }
  }
}
