import { Injectable } from '@angular/core';
import {Contact} from './contact.model';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
 private contacts: Contact[] = [];
 private contactsUpdated = new Subject<Contact[]>();
 constructor(private http: HttpClient, private router: Router) {

 }
  getcontacts() {
    this.http.get<{message: string, contacts: any}>('http://localhost:3000/api/contacts/')
    .pipe(map((contactData) => {
       return contactData.contacts.map((contact: any) => {
           return {
             firstName: contact.firstName,
             secondName: contact.secondName,
             contactNo: contact.contactNo,
             id: contact._id
           };
       });
    }))
    .subscribe(contactData => {
      this.contacts = contactData;
      this.contactsUpdated.next([...this.contacts]);
    });
  }

  getContactUpdateListener() {
     return this.contactsUpdated.asObservable();
  }

  addContact(firstName1: string, secondName1: string, contactNo1: string) {
    const contact: Contact = {id: null, firstName: firstName1, secondName: secondName1, contactNo: contactNo1};
    this.http.post<{message: string, contactId: string}>('http://localhost:3000/api/contacts/', contact)
    .subscribe((contactData) => {
      const contactId = contactData.contactId;
      contact.id = contactId;
      this.contacts.push(contact);
      this.contactsUpdated.next([...this.contacts]);
    });
    this.router.navigate(['/']);
  }

  getContactId(id: string) {
     return this.http.get<{_id: string, firstName: string, secondName: string,
         contactNo: string}>('http://localhost:3000/api/contacts/' + id);
  }
  updateContact(contactId: string, firstName1: string, secondName1: string, contactNo1: string) {
    const contact: Contact = {id: contactId, firstName: firstName1, secondName: secondName1, contactNo: contactNo1};
    this.http.put<{message: string, contact: Contact}>('http://localhost:3000/api/contacts/' + contact.id, contact )
      .subscribe((responseData) => {
        const updatedcontacts = [...this.contacts];
        const oldContactIndex = updatedcontacts.findIndex(p => p.id === contact.id);
        updatedcontacts[oldContactIndex] = contact;
        this.contacts = updatedcontacts;
        this.contactsUpdated.next([...this.contacts]);
        this.router.navigate(['/']);
      });

  }

  deleteContact(contactId: string) {
    this.http.delete('http://localhost:3000/api/contacts/' + contactId  )
    .subscribe((message) => {
       const updatedcontacts = this.contacts.filter(contact => contact.id !== contactId);
       this.contacts = updatedcontacts;
       this.contactsUpdated.next([...this.contacts]);
    });
  }

}
