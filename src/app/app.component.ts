import { Component } from '@angular/core';
import {Contact} from './contact.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedPosts = [];
  onAddPost(post: Contact) {
    this.storedPosts.push(post);
  }
  }
