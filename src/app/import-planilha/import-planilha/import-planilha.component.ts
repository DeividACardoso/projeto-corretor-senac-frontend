import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../shared/service/cliente.service';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-file',
  templateUrl: './import-planilha.component.html',
  styleUrl: './import-planilha.component.scss'
})
export class ImportPlanilhaComponent implements OnInit {

  public file: File;
  title = "Importar Planilha";

  constructor(private clienteService: ClienteService, private router: Router, private titleService: Title) { }
  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.verificarToken();
  }

  verificarToken() {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
    }
  }

  uploadPlanilha() {
    this.clienteService.uploadfile(this.file).subscribe(
      resultado => {
        Swal.fire('Sucesso', 'Arquivo enviado com sucesso', 'success');
      },
      erro => {
        Swal.fire('Erro', 'Erro ao enviar arquivo : ' + erro, 'error');
      }
    );
  }

  onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onFileDrop(event) {
    this.onFileSelected(event);
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
  }
}