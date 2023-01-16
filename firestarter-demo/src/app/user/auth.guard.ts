import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';

import { SnackService } from '../services/snack.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private afAuth = inject(Auth);
  private snackService = inject(SnackService);

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const currentUser = this.afAuth.currentUser;
    const isLoggedIn = currentUser != null;

    if (!isLoggedIn) {
      this.snackService.authError();
    }

    return isLoggedIn;
  }
}
