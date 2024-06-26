import { Component, OnInit, ViewChild } from '@angular/core';
import { Seguradora } from '../../shared/model/seguradora';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { SeguradoraService } from '../../shared/service/seguradora.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-seguradora-detalhe',
  templateUrl: './seguradora-detalhe.component.html',
  styleUrl: './seguradora-detalhe.component.scss'
})
export class SeguradoraDetalheComponent implements OnInit {

  public seguradora: Seguradora = new Seguradora();
  public idSeguradora: number;

  @ViewChild('ngForm')
  public ngForm: NgForm;

  constructor(private seguradoraService: SeguradoraService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title) {}

    title="Cadastro de Seguradora"


    ngOnInit(): void {
      this.titleService.setTitle(this.title)
      this.route.params.subscribe(params => {
        this.idSeguradora = params['id'];

        if(this.idSeguradora){
          this.buscarSeguradora();
        }
      });
    }

  salvar(form: NgForm) {
    if (form.invalid) {
      Swal.fire("Erro", "Formulário inválido", 'error');
    }
    if (this.idSeguradora) {
      this.atualizar();
    } else {
      this.inserirSeguradora();
    }

  }
  public voltar() {
    this.router.navigate(['/seguradora/lista'])
  }

  inserirSeguradora() {
    this.seguradoraService.salvar(this.seguradora).subscribe(
      sucesso => {
        Swal.fire("Sucesso", "Seguradora salva com sucesso", 'success');
        this.seguradora = new Seguradora();
      },
      erro => {
        Swal.fire("Erro", "Não foi possivel salvar a seguradora: " + erro.error.message, 'error');
      }
    )
  }

  atualizar() {
    this.seguradoraService.atualizar(this.idSeguradora, this.seguradora).subscribe(
      sucesso => {
        Swal.fire("Sucesso", "Seguradora Atualizada com Sucesso!", 'success');
      },
      erro => {
        Swal.fire("Erro", "Não foi possivel atualizar a Seguradora", 'error');
      }
    )
  }

  buscarSeguradora() {
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
}
