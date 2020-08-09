import { PostsComponent } from './contact-create/contacts.component';
import { ContactsListsComponent } from './contact-lists/contacts-lists.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [

  {path: '', component: ContactsListsComponent},
  {path: 'create', component: PostsComponent},
  {path: 'edit/:contactId', component: PostsComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
