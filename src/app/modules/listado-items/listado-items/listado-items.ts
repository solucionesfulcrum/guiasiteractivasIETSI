import { Component } from '@angular/core';

@Component({
  selector: 'app-listado-items',
  standalone: false,
  templateUrl: './listado-items.html',
  styleUrl: './listado-items.scss',
})
export class ListadoItems {

  filtrosDesplegables = [
    {tituloFiltro: 'Primer filtro y opciones', expanded: true},
    {tituloFiltro: 'Segundo filtro y opciones', expanded: true},
  ];

  toggle(opt: number) {
    this.filtrosDesplegables[opt].expanded = !this.filtrosDesplegables[opt].expanded;
  }
}
