import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', Validators.required),
    }, { validators: this.checkPasswords });
  }

  addUser() {
    if (this.registerForm.invalid) return;
    this.authService.addUser({
      username: this.registerForm.value.username,
      password: this.registerForm.value.password
    });
    this.router.navigate(['/login']);
  }

  private checkPasswords(control: FormGroup) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password?.value !== confirmPassword?.value ? { missMatch: true } : null;
  }

  get getErrorLabel() {
    if (this.registerForm.errors?.['required']) return 'Les champs sont obligatoires';
    if (!!this.registerForm.controls?.['password']?.errors?.['minlength']) return `La longueur minimale pour votre mot de passe est ${this.registerForm.controls?.['password']?.errors?.['minlength']?.requiredLength}`;
    if (!!this.registerForm.controls?.['password']?.errors?.['maxlength']) return `La longueur maximale pour votre mot de passe est ${this.registerForm.controls?.['password']?.errors?.['maxlength']?.requiredLength}`;
    if (this.registerForm.errors?.['missMatch']) return 'Les mots de passe ne correspondent pas';
    return 'Un problème est survenu';
  }
}