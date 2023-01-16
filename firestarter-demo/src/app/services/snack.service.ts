import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  authError() {
    this.snackBar.open('You must be logged in!', 'OK', {
      duration: 5000,
    });

    return this.snackBar._openedSnackBarRef
      ?.onAction()
      .pipe(tap((_) => this.router.navigate(['/login'])))
      .subscribe();
  }
}
