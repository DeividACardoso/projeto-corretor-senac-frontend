import { Component } from '@angular/core';
import { ClienteService } from '../../shared/service/cliente.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './import-planilha.component.html',
  styleUrl: './import-planilha.component.scss'
})
export class ImportPlanilhaComponent {

  public file: File;

  constructor(private clienteService: ClienteService) { }

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