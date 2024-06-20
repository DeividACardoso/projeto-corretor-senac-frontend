import { Component } from '@angular/core';
import { ClienteService } from '../../shared/service/cliente.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './import-planilha.component.html',
  styleUrls: ['./import-planilha.component.scss']
})
export class ImportPlanilhaComponent {

  public file: File;

  constructor(private clienteService: ClienteService) { }

  uploadPlanilha() {
    this.clienteService.uploadfile(this.file).subscribe(
      resultado => {

      }
    );
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
  }
}