import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http'
import { Component, OnInit } from '@angular/core';
import {Observable, tap} from 'rxjs';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService implements OnInit{
  urlBase = "https://reseau.jdedev.fr/api/user"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  jwtToken?: string | null;
  collectionsUser : [] = [];
  expToken: string = "";
  tokenPayload : string;
  idUserConnected : number;

  constructor(private http: HttpClient, private jwtHelper :JwtHelperService) { }

  loginUser(email: string, password: string): Observable<TokenObject> {
    return this.http
      .post<TokenObject>(
        this.urlBase + '/connect',
        {email: email, password : password},
        this.httpOptions)
      .pipe(tap((token: TokenObject)=> token));
  }

  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
      localStorage.setItem('accessTokenAngularSocial', token);
      this.GetTokenDecoded();
    }
  }

  GetTokenDecoded() {
    this.expToken = localStorage['accessTokenAngularSocial'];
    const infoUser = this.jwtHelper.decodeToken(this.expToken);
    this.idUserConnected = infoUser.id;
    this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(this.expToken));
    
    return this.idUserConnected;
  }

  getAllUsers(token: string): any {      
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http
      .get(this.urlBase, { headers: headers });
  }

  getUser(token: string, id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http
      .get(this.urlBase + `/${id}`, { headers: headers });
  }

  newUser(token: string, email: UserRegister, password: UserRegister, pseudo: UserRegister) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http
      .post(
        this.urlBase,
        { email: email, password: password, pseudo: pseudo , avatar: ""},
        this.httpOptions)
  }

  updateUser(token: string, idUser: number, email: string, password: string, pseudo: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http
      .put(
        `${this.urlBase}/${idUser}`,
        { email: email, password: password, pseudo: pseudo , avatar: ""},
        { headers: headers })
  }

  ngOnInit() {}
}

export interface TokenObject {
  id: number;
  email: string;
  password: string;
  niveau: number;
  token: string;
}

export interface UserRegister {
  mail: string;
  pseudo : string;
  pass: string;
  comfirmPass: string
}