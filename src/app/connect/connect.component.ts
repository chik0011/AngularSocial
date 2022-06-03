import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {Router} from '@angular/router'
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {

  connectForm: FormGroup;
  error: string = "";
  msgError: string = "";

  constructor(formBuilder: FormBuilder, private route:Router, private userService: UserServiceService) { 
    this.connectForm = formBuilder.group({
      email: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      pass: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ])
    });
  }

  submitForm() {
    if (this.connectForm.valid) {
      const that = this;
      this.userService
        .loginUser(this.connectForm.value.email, this.connectForm.value.pass)
        .subscribe({
          next: (data) => {
            that.userService.setToken(data.token);
            this.route.navigate(['/app-collection-item']);
          },
          error: (error) => {
            this.error = "color: red";
            this.msgError = "L'adresse mail ou le mot de passe est incorrect.";
            console.error('There was an error!', error);
          }
        });
    }
    else {
      this.error = "color: red";
      this.msgError = "Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spéciale.";
    }
  }

  ngOnInit(): void {
  }
}

