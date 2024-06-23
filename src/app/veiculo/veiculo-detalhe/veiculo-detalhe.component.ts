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

    ngOnInit(): void {
        this.preencherMarcas();
    }

    constructor(private veiculoService: VeiculoService,
        private router: Router) { }

    public marcaCodigo: string = '';
    public modeloCodigo: string = '';
    public anoCodigo: string = '';
    public marcas: any[] = [];
    public modelos: any[] = [];
    public anos: any[] = [];
    public veiculoProvisorio: any = {
        valor: '',
        combustivel: '',
        anoModelo: '',
    };

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

    preencherMarcas() {
        this.veiculoService.preencherMarcas().subscribe(
            resultado => {
                this.marcas = resultado;
                console.log('marcas:', this.marcas);
            }
        )
    }

    preencherModelos() {
        for (let i = 0; i < this.marcas.length; i++) {
            if (this.marcas[i].nome == this.veiculo.marca) {
                this.marcaCodigo = this.marcas[i].codigo;
                console.log(this.marcaCodigo);

                this.veiculoService.preencherModelos(this.marcaCodigo).subscribe(
                    resultado => {
                        this.modelos = resultado.modelos;
                        this.anos = resultado.anos;
                    }
                )
            }
        }
    }
    
    procurarVeiculo(){
        for(let i = 0; i < this.modelos.length; i++){
            if(this.modelos[i].nome == this.veiculo.modelo){
                this.modeloCodigo = this.modelos[i].codigo;
                console.log('modeloCodigo:',this.modeloCodigo);
            }
        }
        for(let i = 0; i < this.anos.length; i++){
            if(this.anos[i].nome == this.veiculo.anoModelo){
                this.anoCodigo = this.anos[i].codigo;
                console.log('anoCodigo', this.anoCodigo);
            }
        }
        this.veiculoService.procurarVeiculo(this.marcaCodigo, this.modeloCodigo, this.anoCodigo).subscribe(
            resultado => {
                this.veiculoProvisorio = resultado;
                this.veiculo.preco = this.veiculoProvisorio.Valor;
                this.veiculo.tipoCombustivel = this.veiculoProvisorio.Combustivel;
                this.veiculo.anoModelo = this.veiculoProvisorio.AnoModelo;
            },
            erro => {
                Swal.fire('Erro', 'Veículo não encontrado', 'error');
            }
        )
    }

    public veiculo: Veiculo = new Veiculo();


}