import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../shared/service/cliente.service';
import { Title } from '@angular/platform-browser';

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
        console.log('Arquivo enviado com sucesso!');
      },
      erro => {
        console.log('Erro ao enviar arquivo!');
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