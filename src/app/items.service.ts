import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http'
import { Component, OnInit } from '@angular/core';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  urlBase = "https://reseau.jdedev.fr/api/article"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getAllItems(token: string): any {      
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http
      .get(this.urlBase, { headers: headers })
  }

  postItem(token: string, title: string, content: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http
      .post(
        this.urlBase,
        {titre: title, contenu : content},
        { headers: headers })
  }

  deleteItem(token: string, idItem : number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http
      .delete(
        `${this.urlBase}/${idItem}`,
        { headers: headers })
  }

  updateItem(token: string, idItem : number, title: string, content: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http
      .put(
        `${this.urlBase}/${idItem}`,
        {titre: title, contenu : content},
        { headers: headers })
  }
}
