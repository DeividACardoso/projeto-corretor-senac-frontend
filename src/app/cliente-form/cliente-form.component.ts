import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cliente } from '../model/cliente.interface';
import { ClienteService } from './../services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss'
})

export default class ClienteFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private clienteService = inject(ClienteService);

save() {
  const clienteForm = this.form!.value;

  if (this.cliente) {
    this.clienteService.update(this.cliente.id, clienteForm)
    .subscribe(() => {
      this.router.navigate(['/']);
    });
  } else {
    this.clienteService.create(clienteForm)
    .subscribe(() => {
      this.router.navigate(['/']);
      });
    }
}

  form ?: FormGroup;
  cliente ?: Cliente;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.clienteService.get(parseInt(id))
      .subscribe( cliente => {
        this.cliente = cliente;
        this.form = this.fb.group({
          nome:['', Validators.required],
          cpf:['', Validators.required],
          dtNascimento: [''],
          email: ['', [Validators.required, Validators.email]],
          cnh: [''],
          ddd: [''],
          telefone: [''],
          estado_civil: [''],
          genero: [''],
          rua: [''],
          bairro: [''],
          nr: [''],
          complemento: [''],
          cidade: [''],
          uf: [''],
          cep: ['']
        });
    })
  } else {
    this.form = this.fb.group({
      nome:[''],
      cpf:[''],
      dtNascimento: [''],
          email: ['', [Validators.required, Validators.email]],
          cnh: [''],
          ddd: [''],
          telefone: [''],
          estado_civil: [''],
          genero: [''],
          rua: [''],
          bairro: [''],
          nr: [''],
          complemento: [''],
          cidade: [''],
          uf: [''],
          cep: ['']
    });
    }
  }

  addCliente(): void {
    const clienteForm = this.form?.value;
    this.clienteService.create(clienteForm)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
    //console.log('caralho !');
  }
}


