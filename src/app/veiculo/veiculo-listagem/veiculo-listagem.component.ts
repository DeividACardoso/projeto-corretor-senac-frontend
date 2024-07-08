import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Veiculo } from '../../shared/model/veiculo';
import { VeiculoService } from '../../shared/service/veiculo.service';
import { VeiculoSeletor } from '../../shared/model/seletor/veiculo.seletor';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-veiculo-listagem',
  templateUrl: './veiculo-listagem.component.html',
  styleUrl: './veiculo-listagem.component.scss',
})
export class VeiculoListagemComponent {
  public veiculo: Veiculo = new Veiculo();
  public seletor: VeiculoSeletor = new VeiculoSeletor();

  public idVeiculo: number;
  constructor(
    private veiculoService: VeiculoService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) { }

  public veiculos: Array<Veiculo> = new Array();
  public title = 'Listagem de Veículos';

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.verificarToken();
    this.buscarVeiculo();
  }

  verificarToken() {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
    }
  }

  buscarVeiculo() {
    this.veiculoService.listarTodos().subscribe(
      (resultado) => {
        this.veiculos = resultado;
      }
    );
  }

  buscarVeiculoPorId() {
    this.veiculoService.pesquisarPorId(this.idVeiculo).subscribe(
      (resultado) => {
        this.veiculo = resultado;
      },
      (erro) => {
        Swal.fire(
          'Erro',
          'Erro ao buscar Veiculo com ID (' + this.idVeiculo + ') : ',
          'error'
        );
        return;
      }
    );
  }

  editar(id: number) {
    this.router.navigate(['veiculos/detalhe', id]);
  }

  pesquisar() {
    this.veiculoService.listarComFiltro(this.seletor).subscribe(
      resultado => {
        this.veiculos = resultado;
      },
      erro => {
        console.log('Erro ao buscar os veículos com filtros: ', erro);
      }
    )
  }

  excluir(id: number) {
    Swal.fire({
      title: 'Confirmação',
      text: 'Deseja realmente excluir o veículo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.veiculoService.verificarSeguro(id).subscribe(
          (temSeguro) => {
            if (temSeguro) {
              Swal.fire(
                'Erro',
                'Não é possível excluir o veículo pois possui seguro associado',
                'error'
              );
            } else {
              this.veiculoService.excluir(id).subscribe(
                (sucesso) => {
                  Swal.fire('Sucesso', 'Veículo excluído com sucesso!', 'success');
                  this.buscarVeiculo();
                },
                (erro) => {
                  Swal.fire(
                    'Erro',
                    'Erro ao excluir o veículo' + erro.error.message,
                    'error'
                  );
                }
              );
            }
          },
          (erro) => {
            Swal.fire(
              'Erro',
              'Erro ao verificar seguro do veículo: ' + erro.error.message,
              'error'
            );
          }
        );
      }
    });

  }
  limpar() {
    this.seletor = new VeiculoSeletor();
  }
}
