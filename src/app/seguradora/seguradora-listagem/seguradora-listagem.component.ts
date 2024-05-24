import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Seguradora } from '../../shared/model/seguradora';
import { SeguradoraService } from '../../shared/service/seguradora.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-seguradora-listagem',
  templateUrl: './seguradora-listagem.component.html',
  styleUrl: './seguradora-listagem.component.scss'
})
export class SeguradoraListagemComponent {
  public seguradora: Seguradora = new Seguradora();
  public idSeguradora: number;

  constructor(private seguradoraService: SeguradoraService,
    private route: ActivatedRoute,
    private router: Router) {
    }

  public seguradoras: Array<Seguradora> = new Array();

  ngOnInit(): void {
    this.buscarSeguradora();
  }

  buscarSeguradora() {
    this.seguradoraService.listarTodos().subscribe(
      resultado =>{
        this.seguradoras = resultado;
      },
      erro =>{
        Swal.fire('Erro', 'Erro ao buscar todas as Seguradoras: ', 'error');
        return;
      }
    )
  }

  buscarSeguradoraPorId() {
    this.seguradoraService.pesquisarPorId(this.idSeguradora).subscribe(
      resultado =>{
        this.seguradora = resultado;
      },
      erro =>{
        Swal.fire('Erro', 'Erro ao buscar Seguradora com ID (' + this.idSeguradora + ') : ', 'error');
        return;
      }
    )
  }

  editar(id: number){
    this.seguradoraService.atualizar(this.seguradora);
    this.router.navigate(['seguradoras/detalhe', id])
  }

  excluir(id: number){
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Deseja excluir a seguradora #' + id +  "?",
      icon: 'warning',
      showCancelButton: true,
    }).then(r => {
      if(r.isConfirmed){
      this.seguradoraService.excluir(id).subscribe(
        sucesso => {
          Swal.fire("Sucesso", "Seguradora excluído com sucesso!", 'success');
          this.buscarSeguradora();
        },
        erro => {
          Swal.fire("Erro", "Erro ao excluir a seguradora " + erro.error.message, 'error')
        }
      )
    }
    })
  }
}
