import { ContactsService } from '../contacts.service';
import { Component, OnInit, OnDestroy} from '@angular/core';
import {Contact} from '../contact.model';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-post-lists',
  templateUrl: './contacts-lists.component.html',
  styleUrls: ['./contacts-lists.component.css']
})
export class ContactsListsComponent implements OnInit, OnDestroy  {
   contacts: Contact[] = [];
   private conSub: Subscription;
   constructor(public ContactService: ContactsService) {}
   onDelete(postId: string) {
      this.ContactService.deleteContact(postId);
   }

   ngOnInit() {
      this.ContactService.getcontacts();
      this.conSub = this.ContactService.getContactUpdateListener().subscribe((contact: Contact[]) => {
        this.contacts = contact;
      });
   }
   ngOnDestroy() {
     this.conSub.unsubscribe();
   }

}

