import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import {Router} from '@angular/router'
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  mail: UserRegister;
  pseudo : UserRegister;
  pass: UserRegister;
  comfirmPass: UserRegister;
  error: string;
  token: string;
  connectForm: FormGroup;

  constructor(private userService: UserServiceService, private route:Router, formBuilder: FormBuilder) {
    this.connectForm = formBuilder.group({
      mailValid: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      passValid: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ]),
      comfirmPassValid: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ])
    });
   }

  ngOnInit(): void {
    this.token = localStorage['accessTokenAngularSocial']
  }

  creatUser() {
    this.connectForm.value.mailValid = this.mail;
    this.connectForm.value.passValid = this.pass;
    this.connectForm.value.comfirmPassValid = this.comfirmPass;

    if (this.connectForm.value.mailValid && this.pseudo && this.connectForm.value.passValid && this.comfirmPass && this.pass == this.comfirmPass) {
      const that = this;

      this.userService
        .newUser(this.token, this.mail, this.pass, this.pseudo)
        .subscribe({
          next: (data) => {
            console.log(data);
            
            this.route.navigate(['/app-connect']);
          },
          error: (error) => {
            this.error = "Un problème est survenu lors de l'inscription";
            console.error('There was an error!', error);
          }
        });
    } else {

      if (this.mail && this.pseudo && this.pass && this.comfirmPass) {
        this.error = "Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spéciale."
      } else {
        this.error = "Il est nécéssaire de remplir l'ensemble des champs"
      }
    }
  }
}

export interface UserRegister {
  mail: string;
  pseudo : string;
  pass: string;
  comfirmPass: string
}