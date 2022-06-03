import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http'
import { Component, OnInit } from '@angular/core';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  urlBase = "https://reseau.jdedev.fr/api/comment"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getAllComments(token: string): any {      
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http
      .get(this.urlBase, { headers: headers })
  }

  postComment(token: string, idItem: number, content: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http
      .post(
        this.urlBase,
        {idArt: idItem, contenu : content},
        { headers: headers })
  }
}
