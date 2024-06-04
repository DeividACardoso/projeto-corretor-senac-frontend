import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  authService: any;
  router: any;

  constructor(private fb: FormBuilder ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  isFormControlInvalid(controlName: string): boolean {
    const control = this.formLogin.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  submitForm() {
    if (this.formLogin.valid) {
      const { username, password } = this.formLogin.value;
      this.authService.login(username, password).subscribe(
        (response: { token: string }) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        },
        (error: any) => {
          console.error('Erro ao autenticar', error);
        }
      );
    }
  }
}
