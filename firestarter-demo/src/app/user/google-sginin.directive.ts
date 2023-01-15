import { Directive, inject, HostListener } from '@angular/core';
import { signInWithPopup, Auth, GoogleAuthProvider } from '@angular/fire/auth';

@Directive({
  selector: '[appGoogleSginin]',
})
export class GoogleSgininDirective {
  private fireAuth = inject(Auth);

  @HostListener('click')
  async onClick() {
    await signInWithPopup(this.fireAuth, new GoogleAuthProvider());
  }
}
