import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Seguradora } from '../../shared/model/seguradora';

@Component({
  selector: 'app-seguradora-detalhe',
  templateUrl: './seguradora-detalhe.component.html',
  styleUrl: './seguradora-detalhe.component.scss'
})
export class SeguradoraDetalheComponent {

  public seguradora:Seguradora = new Seguradora();

}
