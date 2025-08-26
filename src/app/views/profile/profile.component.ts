import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  activeTab: 'personal' | 'password' = 'personal';
  profileForm: FormGroup;
  passwordForm: FormGroup;
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  // Mock user data - in real app this would come from a service
  userData = {
    firstName: 'Sayazhan',
    lastName: 'Yeshankulov',
    middleName: 'Abdusamatuly',
    email: 'sayazhan.yeshankulov@example.com',
    phone: '+7 777 123 45 67'
  };

  constructor(private fb: FormBuilder) {
    this.initForms();
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  private initForms(): void {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      middleName: ['', [Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+7\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/)]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(form: FormGroup): {[key: string]: any} | null {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');

    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  private loadUserData(): void {
    this.profileForm.patchValue(this.userData);
  }

  setActiveTab(tab: 'personal' | 'password'): void {
    this.activeTab = tab;
  }

  togglePasswordVisibility(field: 'current' | 'new' | 'confirm'): void {
    switch (field) {
      case 'current':
        this.showCurrentPassword = !this.showCurrentPassword;
        break;
      case 'new':
        this.showNewPassword = !this.showNewPassword;
        break;
      case 'confirm':
        this.showConfirmPassword = !this.showConfirmPassword;
        break;
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file.name);
    }
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      console.log('Saving profile:', this.profileForm.value);
      // Implement save logic here
    } else {
      this.markFormGroupTouched(this.profileForm);
    }
  }

  changePassword(): void {
    if (this.passwordForm.valid) {
      console.log('Changing password:', this.passwordForm.value);
      // Implement password change logic here
    } else {
      this.markFormGroupTouched(this.passwordForm);
    }
  }

  cancel(): void {
    this.loadUserData();
    this.passwordForm.reset();
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(form: FormGroup, fieldName: string): string {
    const field = form.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return 'Это поле обязательно для заполнения';
      }
      if (field.errors['email']) {
        return 'Введите корректный email';
      }
      if (field.errors['minlength']) {
        return `Минимальная длина ${field.errors['minlength'].requiredLength} символов`;
      }
      if (field.errors['pattern']) {
        return 'Введите корректный номер телефона';
      }
    }
    return '';
  }

  getPasswordError(): string {
    if (this.passwordForm.errors?.['passwordMismatch'] &&
        this.passwordForm.get('confirmPassword')?.touched) {
      return 'Пароли не совпадают';
    }
    return '';
  }
}
