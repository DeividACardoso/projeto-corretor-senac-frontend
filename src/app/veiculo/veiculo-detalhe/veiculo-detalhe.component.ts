import { Component, OnInit } from '@angular/core';
import { Veiculo } from '../../shared/model/veiculo';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { VeiculoService } from '../../shared/service/veiculo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-veiculo-detalhe',
    templateUrl: './veiculo-detalhe.component.html',
    styleUrls: ['./veiculo-detalhe.component.scss']
})
export class VeiculoDetalheComponent implements OnInit {
    public listaEstados: string[] = [
        "AC",
        "AL",
        "AP",
        "AM",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MT",
        "MS",
        "MG",
        "PA",
        "PB",
        "PR",
        "PE",
        "PI",
        "RJ",
        "RN",
        "RS",
        "RO",
        "RR",
        "SC",
        "SP",
        "SE",
        "TO"
        ];

    constructor(private veiculoService: VeiculoService,
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.idVeiculo = params['id'];

            if (this.idVeiculo) {
                this.buscarVeiculo();
            } else {
                this.carregarListaClientes();
                this.preencherMarcas();
            }
        });
    }

    public idVeiculo: number;
    public marcaCodigo: string = '';
    public modeloCodigo: string = '';
    public anoCodigo: string = '';
    public marcas: any[] = [];
    public modelos: any[] = [];
    public anos: any[] = [];
    public listaClientes: any[] = [];
    public displayCliente: string;
    public veiculoProvisorio: any = {
        valor: '',
        combustivel: '',
        anoModelo: '',
    };


    onInputChange(event: any) {
        const input = event.target.value;
        const selectedClient = this.listaClientes.find(cliente => `${cliente.nome}` === input);
        if (selectedClient) {
            this.veiculo.cliente = selectedClient;
        } else {
            this.veiculo.cliente = null;
        }
    }

    ngOnChanges() {
        if (this.veiculo.cliente) {
            this.displayCliente = `${this.veiculo.cliente.cpf}`;
        } else {
            this.displayCliente = '';
        }
    }

    carregarListaClientes() {
        this.veiculoService.getListaClientes().subscribe(
            (clientes) => {
                this.listaClientes = clientes;
                console.log("Lista de clientes carregada:", this.listaClientes);
            },
            (error) => {
                console.error('Erro ao obter lista de clientes', error);
            }
        );
    }
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

    buscarVeiculo() {
        this.veiculoService.pesquisarPorId(this.idVeiculo).subscribe(
            resultado => {
                this.veiculo = resultado;
                this.displayCliente = this.veiculo.cliente ? this.veiculo.cliente.nome : '';
                console.log("Veículo encontrado:", this.veiculo);
            },
            erro => {
                Swal.fire('Erro', 'Erro ao buscar seguro com ID (' + this.idVeiculo + ') : ', 'error');
                return;
            }
        );
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

    procurarVeiculo() {
        for (let i = 0; i < this.modelos.length; i++) {
            if (this.modelos[i].nome == this.veiculo.modelo) {
                this.modeloCodigo = this.modelos[i].codigo;
                console.log('modeloCodigo:', this.modeloCodigo);
            }
        }
        for (let i = 0; i < this.anos.length; i++) {
            if (this.anos[i].nome == this.veiculo.anoModelo) {
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