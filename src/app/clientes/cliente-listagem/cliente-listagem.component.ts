import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../shared/service/cliente.service';
import Swal from 'sweetalert2';
import { Cliente } from '../../shared/model/cliente';
import { ClienteSeletor } from '../../shared/model/seletor/cliente.seletor';
import { from, Observable, switchMap } from 'rxjs';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-listagem.component.html',
  styleUrl: './cliente-listagem.component.scss'
})

export class ClienteListagemComponent implements OnInit {
  seletor: ClienteSeletor = new ClienteSeletor();
  possuiSeguro: boolean;
  fileName = "RelatorioClientes.xlsx"

  constructor(private clienteService: ClienteService, private router: Router) {
  }

  public clientes: Array<Cliente> = new Array();

  ngOnInit(): void {
    this.verificarToken();
    this.buscarClientes();
  }

  verificarToken() {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
    }
  }

  buscarClientes() {
    this.clienteService.listarTodos().subscribe(
      resultado => {
        this.clientes = resultado;
        this.clientes.forEach(cliente => {
          this.verificarClienteTemSeguro(cliente.id).subscribe(possuiSeguro => {
            cliente.temSeguro = possuiSeguro;
          });
        });
      },
      erro => {
        console.log('Erro ao buscar Clientes: ', erro);
      }
    )
  }

  editar(id: number) {
    this.router.navigate(['clientes/detalhe', id])
  }

  verificarClienteTemSeguro(id: number): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.clienteService.verificarClienteTemSeguro(id).subscribe(
        resultado => {
          observer.next(resultado);
          observer.complete();
          console.log('Cliente possui seguro: ', resultado);
        },
        erro => {
          Swal.fire("Erro", "Erro ao verificar se cliente possui seguro: " + erro.error.message, 'error');
          observer.error(erro);
        }
      );
    });
  }

  possuiSeguroAtivo(id: number): boolean {
    this.clienteService.verificarClienteTemSeguro(id).subscribe(
      resultado => {
        this.possuiSeguro = resultado;
      },
      erro => {
        Swal.fire("Erro", "Erro ao verificar se cliente possui seguro: ", 'error');
      }
    )
    return this.possuiSeguro;
  }

  excluir(id: number) {
    this.verificarClienteTemSeguro(id).pipe(
      switchMap(possuiSeguro => {
        if (possuiSeguro) {
          Swal.fire("Erro", "Cliente possui seguro ativo!", 'error');
          return new Observable<void>(observer => observer.complete());
        } else {
          return from(Swal.fire({
            title: 'Você tem certeza?',
            text: 'Deseja excluir o cliente #' + id + "?",
            icon: 'warning',
            showCancelButton: true,
          })).pipe(
            switchMap(result => {
              if (result.isConfirmed) {
                return this.clienteService.excluir(id);
              } else {
                return new Observable<void>(observer => observer.complete());
              }
            })
          );
        }
      })
    ).subscribe(
      sucesso => {
        if (sucesso) {
          Swal.fire("Sucesso", "Cliente excluído com sucesso!", 'success');
          this.buscarClientes();
        }
      },
      erro => {
        Swal.fire("Erro", "Erro ao excluir o cliente: " + erro, 'error');
      }
    );
  }

  limpar(){
    this.seletor = new ClienteSeletor();
    this.buscarClientes();
  }

  pesquisar(){
    console.log(this.seletor.cpf);
    if(this.seletor.cpf){
      this.seletor.cpf = this.seletor.cpf.replace(/\D/g, '');
    }
    this.clienteService.pesquisar(this.seletor).subscribe(
      resultado => {
        this.clientes = resultado;
      },
      erro => {
        Swal.fire("Erro", "Erro ao pesquisar clientes: " + erro, 'error');
      }
    );
  }

  exportar() {
    let data = document.getElementById("tabelaClientes");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data)

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }
}
