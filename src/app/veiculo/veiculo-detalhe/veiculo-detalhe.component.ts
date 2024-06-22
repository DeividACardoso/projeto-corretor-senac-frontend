import { Component, OnInit } from '@angular/core';
import { Veiculo } from '../../shared/model/veiculo';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { VeiculoService } from '../../shared/service/veiculo.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-veiculo-detalhe',
    templateUrl: './veiculo-detalhe.component.html',
    styleUrls: ['./veiculo-detalhe.component.scss']
})
export class VeiculoDetalheComponent implements OnInit {
    
    constructor(private veiculoService: VeiculoService,
        private router : Router) { }

    salvar() {
        this.veiculoService.salvar(this.veiculo).subscribe(
            resultado => {
                Swal.fire('Sucesso', 'Veículo salvo com sucesso', 'success');
            },
            erro => {
                Swal.fire('Erro', 'Erro ao salvar veículo', 'error');
            }
        );
    }
    voltar() {
        this.router.navigate(['/veiculo/lista']);
    }
    public viaCep(cepInformado: string) {
        var txtCep = document.getElementById('txtCep');

        fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
            .then(resultado => resultado.json())
            .then(json => {
                if (json.erro) {
                    Swal.fire("Erro", "Não foi possível preencher os campos de endereço", 'warning')
                } else {
                    this.preencherCamposEnderecoComJSON(json);
                }
            })
            .catch(erro => {
            })
    }

    public preencherCamposEnderecoComJSON(json: any) {
        this.veiculo.uf = json.uf;
        this.veiculo.cidade = json.localidade;
        this.veiculo.bairro = json.bairro;
        this.veiculo.rua = json.logradouro;
    }


    public veiculo: Veiculo = new Veiculo();

    ngOnInit(): void {
    }

}