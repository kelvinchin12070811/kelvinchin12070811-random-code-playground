import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from '@angular/fire/auth';

type LoginState = 'login' | 'signup' | 'reset';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss'],
})
export class EmailLoginComponent implements OnInit {
  public form?: FormGroup;
  public type: LoginState = 'signup';
  public loading = false;
  public serverMessage: string = '';

  private auth = inject(Auth);
  private formBuilder = inject(FormBuilder);

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: [''],
    });
  }

  changeType(newType: LoginState) {
    this.type = newType;
  }

  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  get email() {
    return this.form?.get('email');
  }

  get password() {
    return this.form?.get('password');
  }

  get passwordConfirm() {
    return this.form?.get('passwordConfirm');
  }

  get passwordDoesMatch() {
    if (this.type !== 'signup') return true;
    return this.password?.value === this.passwordConfirm?.value;
  }

  async onSubmit() {
    this.loading = true;

    const email = this.email?.value;
    const password = this.password?.value;

    try {
      if (this.isLogin) {
        await signInWithEmailAndPassword(this.auth, email, password);
      } else if (this.isSignup) {
        await createUserWithEmailAndPassword(this.auth, email, password);
      } else if (this.isPasswordReset) {
        await sendPasswordResetEmail(this.auth, email);
        this.serverMessage = 'Check your email';
      }
    } catch (e) {
      this.serverMessage = e as string;
    }

    this.loading = false;
  }
}
