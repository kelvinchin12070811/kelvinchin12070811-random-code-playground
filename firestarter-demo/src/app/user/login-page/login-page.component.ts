import { Component, inject } from '@angular/core';
import { Auth, authState, signOut } from '@angular/fire/auth';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  public fireAuth = inject(Auth);
  public user$ = authState(this.fireAuth);

  async logout() {
    await signOut(this.fireAuth);
  }
}
