import { Component, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import {Contact} from '../contact.model';
import {ContactsService} from '../contacts.service';
import {NgForm} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-posts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class PostsComponent implements OnInit {

  constructor(public ContactService: ContactsService, public route: ActivatedRoute ) { }
  private mode = 'create';
  private contactId: string;
  contact: Contact;

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if ( paramMap.has('contactId')) {
          this.mode = 'edit';
          this.contactId = paramMap.get('contactId');
          this.ContactService.getContactId(this.contactId).subscribe((contactData) => {
            this.contact = {id: contactData._id, firstName: contactData.firstName, secondName: contactData.secondName
                                , contactNo: contactData.contactNo};
          });
      } else {
          this.mode = 'create';
          this.contactId = null;
      }
    });
  }
  onSaveContact(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.ContactService.addContact(form.value.firstName, form.value.secondName, form.value.contactNo);
    } else {
      this.ContactService.updateContact(this.contactId, form.value.firstName, form.value.secondName, form.value.contactNo);
    }
    form.resetForm();
  }
}
