import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getContacts().subscribe(
      (data: Contact[]) => {
        this.contacts = data;
      },
      error => {
        console.error('Error fetching contacts:', error);
      }
    );
  }
  
  deleteContact(id: number): void {
    this.contactService.deleteContact(id).subscribe(
      () => {
        console.log('Contacto eliminado');
        this.contacts = this.contacts.filter(c => c.id !== id);
      },
      error => {
        console.error('Error deleting contact:', error);
      }
    );
  }
}

