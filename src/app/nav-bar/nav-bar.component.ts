import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  access() {
    let localSto = localStorage['accessTokenAngularSocial']

    if (localSto) {
      return 1
    } else {
      return 0
    }
  }

  deconnected() {
    let localSto = localStorage['accessTokenAngularSocial']

    if (localSto) {
      localStorage.removeItem('accessTokenAngularSocial');
      this.route.navigate(['/app-connect']);
    }
  }
}
