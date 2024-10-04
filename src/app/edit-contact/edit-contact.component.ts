import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
})
export class EditContactComponent implements OnInit {
  contactForm: FormGroup;
  contactId!: number;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
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

  ngOnInit(): void {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadContact();
  }

  loadContact(): void {
    this.contactService.getContactById(this.contactId).subscribe(
      (contact) => {
        this.contactForm.patchValue(contact);
        // Aquí puedes agregar lógica para inicializar los arrays de teléfonos y emails
        // Por ejemplo, si usas FormArray, necesitarás agregar los controles correspondientes
      },
      (error) => {
        console.error('Error fetching contact:', error);
      }
    );
  }

  editContact(): void {
    if (this.contactForm.valid) {
      const updatedContact: Contact = this.contactForm.value;
      this.contactService.updateContact(this.contactId, updatedContact).subscribe(
        () => {
          console.log('Contacto actualizado:', updatedContact);
          this.router.navigate(['/contacts']);  // Redirige después de actualizar
        },
        (error) => {
          console.error('Error updating contact:', error);
        }
      );
    }
  }
}
