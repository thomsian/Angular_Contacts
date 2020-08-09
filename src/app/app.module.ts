import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule,
          MatExpansionModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { PostsComponent } from './contact-create/contacts.component';
import { ContactsListsComponent } from './contact-lists/contacts-lists.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsComponent,
    ContactsListsComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    AppRoutingModule, MatInputModule,
    MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule,
    BrowserAnimationsModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
