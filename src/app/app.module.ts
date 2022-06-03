import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectComponent } from './connect/connect.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CookieService } from 'ngx-cookie-service';
import { CollectionItemComponent } from './collection-item/collection-item.component';
import { CollectionUsersComponent } from './collection-users/collection-users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'

import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CardUserComponent } from './card-user/card-user.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@NgModule({
  declarations: [
    AppComponent,
    ConnectComponent,
    SubscribeComponent,
    FooterComponent,
    NavBarComponent,
    CollectionItemComponent,
    CollectionUsersComponent,
    CardUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    AngularEditorModule,
    MatExpansionModule,
    FontAwesomeModule
  ],
  providers: [CookieService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
