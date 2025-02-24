import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { NotificationService } from '../../services/theme/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  private notificationService = inject(NotificationService);

  hide = signal(true);

  loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  logIn(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.notificationService.showNotification('Login works', 'Ok');
      this.loginForm.reset();
      this.router.navigateByUrl('/base');
    }
  }

  clickHide(event: MouseEvent): any {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  ngOnDestroy(): void {}
}
