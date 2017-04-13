import {ChangeDetectorRef, Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from './auth.service';

import 'style-loader!./login.scss';

@Component({
  selector: 'login',
  templateUrl: './login.html',
})
export class Login {

  public processing = false;
  public error = false;

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(
    fb:FormBuilder,
    private _authService: AuthService,
    private _changeDetector: ChangeDetectorRef,
  ) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values) {

    this.submitted = true;
    
    if (!this.form.valid) {
      return;
    }

    this.error = false;
    this.processing = true;
    this._changeDetector.detectChanges();

    this._authService.login(values.email, values.password).subscribe(
          () => {
              this.processing = false;
              this._changeDetector.detectChanges();
          },
          error => {
              this.processing = false;
              this.error = true;
              this._changeDetector.detectChanges();
          });
  }
}
