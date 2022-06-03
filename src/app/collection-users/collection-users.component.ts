import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { UserServiceService } from '../user-service.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-collection-users',
  templateUrl: './collection-users.component.html',
  styleUrls: ['./collection-users.component.css']
})
export class CollectionUsersComponent implements AfterViewInit  {
  displayedColumns: string[] = ['id', 'pseudo', 'email'];
  users : User[] = []
  dataSource = new MatTableDataSource<User>(this.users);
  token : string

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserServiceService, private route:Router) {
    this.token = localStorage['accessTokenAngularSocial']
    const that = this;
    
    this.userService.getAllUsers(this.token).subscribe({
      next(res: any) {
        that.users = res;
        that.dataSource = new MatTableDataSource<User>(that.users);
        that.dataSource.paginator = that.paginator;
      },
      error(err : any) {
        alert(err);
      }
    });
  }

  locationCard(id: number) {
    this.route.navigate(['/app-card-user', id]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface User {
  id: number;
  pseudo : string;
  email: string;
  avatar: " " ;
  niveau: number;
  password: string
}
