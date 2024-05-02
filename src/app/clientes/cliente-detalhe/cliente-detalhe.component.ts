import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../shared/model/cliente.interface';
import { ClienteService } from '../../shared/service/cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-detalhe.component.html',
  styleUrl: './cliente-detalhe.component.scss'
})
export class ClienteDetalheComponent implements OnInit {

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

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private clienteService = inject(ClienteService);

  form ?: FormGroup;
  cliente ?: Cliente;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.clienteService.get(parseInt(id))
      .subscribe( cliente => {
        this.cliente = cliente;
        this.form = this.fb.group({
          nome:[cliente.id],
          cpf:[cliente.cpf],
        });
    })
  } else {
    this.form = this.fb.group({
      nome:[''],
      cpf:[''],
    });
    }
  }
}

