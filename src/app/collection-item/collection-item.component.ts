import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ItemsService } from '../items.service';
import { CommentsService } from '../comments.service';
import { UserServiceService } from '../user-service.service';
import {Router} from '@angular/router'
import { faBars, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-collection-item',
  templateUrl: './collection-item.component.html',
  styleUrls: ['./collection-item.component.css']
})
export class CollectionItemComponent implements OnInit {
  htmlContent = '';
  htmlTitleContent = '';
  token: string;
  panelOpenState = false;
  errorPostItem: string = '';
  commentContent: string = '';
  idUserConnected: number;

  titleModal: string;
  describModal: string;
  styleModal: string;
  idArticleModal: number;

  faEllipsis = faBars;
  faTrash = faTrash
  faPenToSquare = faPenToSquare
  faXmark = faXmark

  styleSetting: string
  styleSettingAction: string = "display: none;"

  items : Item[] = [];
  comms : [] = [];

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: "Une idée d'article ?",
    translate: 'yes',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  constructor(
    private itemService: ItemsService, 
    private commentService: CommentsService,
    private userService: UserServiceService,
    private route:Router
    ) {
      this.idUserConnected = this.userService.GetTokenDecoded()
  }

  ngOnInit(): void {
    this.token = localStorage['accessTokenAngularSocial']
    const that = this;
    this.itemService.getAllItems(this.token).subscribe({
      next(res: any) {
        that.items = res;
        that.getCommByItem();
      },
      error(err : any) {
        alert(err);
      }
    });
  }

  getCommByItem() {
    const that = this;
    this.commentService.getAllComments(this.token).subscribe({
      next(res: any) {
        that.comms = res;
        that.items.forEach(item => {
          item.comments = [ ]
          that.comms.forEach(comm => {
            if (item["id_article"] == comm["id_article"] && comm["contenu"] != "") {
              item.comments.push(comm["contenu"])
            }});
        });

        that.setDataByItem()
      },
      error(err : any) {
        alert(err);
      }
    });
  }

  setDataByItem() {
    this.items.forEach(item => {
      item.numComments = item.comments.length

      const that = this
      this.userService.getUser(this.token, item.id).subscribe({
        next(res: any) {
          item.pseudo = res.pseudo
        },
        error(err : any) {
          alert(err);
        }
      });
    });
  }

  postItem() {
    this.htmlContent = this.htmlContent.replace(/(<([^>]+)>)/gi, "").replace(/&nbsp;/g,' ').replace(/&#233;/g,'é').replace(/&#160;/g,' ').replace(/&#231;/g,'ç');

    if (this.htmlContent && this.htmlTitleContent) {
      console.log("super !");
      this.errorPostItem = ""

      this.itemService.postItem(this.token, this.htmlTitleContent, this.htmlContent)
      .subscribe({
        next: (data) => {
          window.location.reload();
          console.log(data);
        },
        error: (error) => {
          this.errorPostItem = "L'article ne peut pas être envoyé"
          console.error('There was an error!', error);
        }
      });
    } else {
      this.errorPostItem = "Vous devez remplir le titre et son contenu."
    }
  }

  sendComment(idItem: number) {
    if (this.commentContent) {
      console.log("super !");
      this.errorPostItem = ""

      this.commentService.postComment(this.token, idItem, this.commentContent)
      .subscribe({
        next: (data) => {
          window.location.reload();
          console.log(data);
        },
        error: (error) => {
          alert("Une erreur est arivée")
          console.error('There was an error !', error);
        }
      });
    } else {
      alert("Vous devez remplir le contenu du commentaires")
    }
  }

  displayManagerItem() {
    this.styleSetting = "display: none";
    this.styleSettingAction = "display: inline-block";
  }

  deleteItem(idItem: number) {
    this.itemService.deleteItem(this.token, idItem)
      .subscribe({
        next: (data) => {
          window.location.reload();
          console.log(data);
        },
        error: (error) => {
          alert("L'article ne peut pas être supprimé")
          console.error('There was an error!', error);
        }
      });
  }

  openModalUpdate(idItem: number, title: string, describe: string) {
    this.titleModal = title;
    this.describModal = describe;
    this.idArticleModal = idItem;
    this.styleModal = "display: flex";
  }

  closeModal() {
    this.styleModal = "display: none";
  }

  updateItem() {
    this.itemService.updateItem(this.token, this.idArticleModal, this.titleModal, this.describModal)
      .subscribe({
        next: (data) => {
          window.location.reload();
          console.log(data);
        },
        error: (error) => {
          alert("L'article ne peut pas être supprimé")
          console.error('There was an error!', error);
        }
      });
  }
}

export interface Item {
  contenu: string;
  creation : string;
  id: number;
  titre: string;
  comments: any[" "];
  numComments: number,
  pseudo: string
  id_article: number
}