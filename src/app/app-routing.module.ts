import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConnectComponent } from "./connect/connect.component";
import { SubscribeComponent } from "./subscribe/subscribe.component";
import { FooterComponent } from "./footer/footer.component";
import { CollectionItemComponent } from "./collection-item/collection-item.component";
import { CollectionUsersComponent } from "./collection-users/collection-users.component";
import { CardUserComponent } from "./card-user/card-user.component";

const routes: Routes = [
  { path: 'app-connect', component: ConnectComponent },
  { path: 'app-footer', component: FooterComponent },
  { path: 'app-subscribe', component: SubscribeComponent },
  { path: 'app-collection-item', component: CollectionItemComponent },
  { path: 'app-collection-users', component: CollectionUsersComponent },
  { path: 'app-card-user/:id', component: CardUserComponent },
  { path: '**', redirectTo: 'app-connect', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
