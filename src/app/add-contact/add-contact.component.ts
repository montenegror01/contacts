import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
})
export class AddContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      notas: [''],
      fecha_cumpleanos: [''],
      pagina_web: [''],
      empresa: [''],
      telefonos: this.fb.array([]),  // Inicializa como un array
      emails: this.fb.array([])       // Inicializa como un array
    });
  }

  ngOnInit(): void {}

  addContact(): void {
    if (this.contactForm.valid) {
      const newContact: Contact = this.contactForm.value;
      this.contactService.addContact(newContact).subscribe(
        (contact) => {
          console.log('Contacto agregado:', contact);
          // Manejar redirección o mensaje de éxito
        },
        error => {
          console.error('Error adding contact:', error);
        }
      );
    }
  }
}
