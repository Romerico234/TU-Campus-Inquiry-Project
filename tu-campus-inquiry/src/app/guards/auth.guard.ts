import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  // Function to determine if a route can be activated
  canActivate(): boolean {
    // Check if the user is logged in by looking for a session storage item
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    // If the user is not logged in, navigate to the login page and return false
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    // If the user is logged in, allow access to the route
    return true;
  }
}
