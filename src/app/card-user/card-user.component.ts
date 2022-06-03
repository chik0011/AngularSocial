import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { ItemsService } from '../items.service';
import { CommentsService } from '../comments.service';
import { elementAt } from 'rxjs-compat/operator/elementAt';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.css']
})
export class CardUserComponent implements OnInit {
  id: number;
  private sub: any;
  token : string;
  user : User;
  allItems : Array<any>;
  allComm : Array<any>;

  idUserConnected: number;

  items : Array<any> = [];
  comms : Array<any> = [];

  faPenToSquare = faPenToSquare;
  faCircleCheck = faCircleCheck;

  styleInputPseudo: string;
  styleLabelPseudo: string;

  constructor(
    private route: ActivatedRoute, 
    private userService: UserServiceService,
    private itemsService: ItemsService,
    private commentsService: CommentsService
    ) { }

  ngOnInit() {
    this.token = localStorage['accessTokenAngularSocial'];
    const that = this;
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];
       this.userService.getUser(this.token, this.id).subscribe({
        next(res: any) {
          that.user = res;
          that.getLastItems();
          that.getLastComm();
        },
        error(err : any) {
          alert(err);
        }
      });
    });

    this.idUserConnected = this.userService.GetTokenDecoded();
  }
  
  changeVuUser() {
    this.styleLabelPseudo = "display: none";
    this.styleInputPseudo = "display: block"
  }

  updateUser() {
    console.log(this.token);

    const that = this;
    
    this.userService.updateUser(this.token, this.id, this.user.email, this.user.password, this.user.pseudo).subscribe({
      next(res: any) {
        console.log(res);
        that.styleInputPseudo = "display : none";
        that.styleLabelPseudo = "display : block";
      },
      error(err : any) {
        alert(err);
      }
    });
  }

  getLastComm() {
    const that = this
    this.commentsService.getAllComments(this.token).subscribe({
      next(res: any) {
        that.allComm = res;
        that.getCommentsForUser();
      },
      error(err : any) {
        alert(err);
      }
    });
  }

  getCommentsForUser() {
    const lastComments : Array<any> = []
    this.allComm.forEach(comm => {
      if (comm.id == this.id && comm.contenu) {
        lastComments.push(comm.contenu.slice(0,50))
      }
    });

    for (let index = 0; index < 5; index++) {
      if (lastComments[index]) {
        this.comms.push(lastComments[index])
      }
    }
  }

  getLastItems() {
    const that = this
    this.itemsService.getAllItems(this.token).subscribe({
      next(res: any) {
        that.allItems = res;
        that.getItemForUser();
      },
      error(err : any) {
        alert(err);
      }
    });
  }

  getItemForUser() {
    const lastItem : Array<any> = []
    this.allItems.forEach(item => {
      if (item.id == this.id && item.contenu) {
        lastItem.push({contenu : item.contenu.slice(0,45), titre : item.titre})
      }
    });

    for (let index = 0; index < 5; index++) {
      if (lastItem[index]) {
        this.items.push(lastItem[index])
      }
    }
  }
}

export interface User {
  id: number;
  pseudo : string;
  email: string;
  avatar: string;
  niveau: number;
  password: string
}