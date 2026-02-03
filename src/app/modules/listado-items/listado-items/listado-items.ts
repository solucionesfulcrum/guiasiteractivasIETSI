import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-listado-items',
  standalone: false,
  templateUrl: './listado-items.html',
  styleUrl: './listado-items.scss',
})
export class ListadoItems {
  loadingBuscar: boolean = false;

  listTopicos: any[] = [];
  listAnio: any[] = [];
  listGrupo: any[] = [];
  listTemas: any[] = [];
  listEspecialidad: any[] = [];

  ctrlAnio = new FormControl("");
  ctrlGrupo = new FormControl("");
  ctrlTopico = new FormControl("");
  
  ctrlTema = new FormControl("");
  ctrlEspecialidad = new FormControl("");

  ctrlBusqueda = new FormControl("");

  listaOriginal: any[] = [];
  listItemsBusqueda: any[] = [];
  orden: number = 1;

  filtrosDesplegables = [
    {tituloFiltro: 'Seleccionar tema', expanded: true, tipoDespliegue: 1, isFiltroReady: false},
    {tituloFiltro: 'Seleccionar especialidad', expanded: true, tipoDespliegue: 2, isFiltroReady: false},
  ];

  constructor( private _http: HttpClient,

  ){}

  ngOnInit(){
    this.cargarDataInicial();
    this.setListeners();
    this.searchItems();
  }

  setListeners(){
    this.ctrlAnio.valueChanges.subscribe((data)=> this.searchItems());
    this.ctrlGrupo.valueChanges.subscribe((data)=> this.searchItems());
    this.ctrlTopico.valueChanges.subscribe((data)=> this.searchItems());

    this.ctrlBusqueda.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(value=> {this.searchItems()});
    this.ctrlTema.valueChanges.pipe(distinctUntilChanged()).subscribe((data)=> this.searchItems());
    this.ctrlEspecialidad.valueChanges.pipe(distinctUntilChanged()).subscribe((data)=> this.searchItems());
  }

  cargarDataInicial(){
    this._http.get<any>('assets/js/Base_GPC_14-04-2025_vpreliminar.json')
      .subscribe(res => {
        this.listaOriginal = res.sheets['2024'].rows;
        // console.log(res.sheets['2024'].rows)
        let especial: any[] = [];
        let temaFiltrado: any[] = [];

        res.sheets["2024"].rows.forEach((obj: any) => {
          if(!this.listAnio.includes(obj.Año)){
            this.listAnio.push(obj.Año)
          }
          if(!this.listGrupo.includes(obj['Grupo etario'])){
            this.listGrupo.push(obj['Grupo etario'])
          }
          if(!especial.includes(obj.Especialidad)){
            especial.push(obj.Especialidad)
          }

          // --------------------------------------Obtener Temas ----------------------------------------------------------------
          if(!temaFiltrado.includes(obj.Tema)){
            temaFiltrado.push(obj.Tema);
            let subTema: any[] = [ ...new Set(res.sheets["2024"].rows.filter((subTe: any) => subTe.Tema === obj.Tema).map((element: any) => element['Condición clínica'].trim()))];

            let objNombre: any[] = obj.Tema.split('\n');

            this.listTemas.push({tema: objNombre.length > 1 ? objNombre[0] + ' & ' + objNombre[1] : objNombre[0] , subTemas: subTema, desplegado: false});
            // ------------------------------------------------------------------------------------------------------------------
          }
        });

        res.sheets["Hoja2"].rows.forEach((obj: any) => {
          this.listTopicos.push(obj.Tópico);
        });

        // --------------------------------------Obtener Especialidades -----------------------------------------------------
        especial.forEach((esp: any) => {
          let subItems = esp.split('\n');
          subItems.forEach((itemEspe: any)=>{
            if (!this.listEspecialidad.includes(itemEspe.trim()) && itemEspe.trim() != "") {
              this.listEspecialidad.push(itemEspe);
            }
          })
        })
        this.listTemas.sort((a, b) => a.tema.localeCompare(b.tema, 'es', { sensitivity: 'base' }));
        this.listEspecialidad.sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
        
        this.filtrosDesplegables[0].isFiltroReady = true;
        this.filtrosDesplegables[1].isFiltroReady = true;
        // ------------------------------------------------------------------------------------------------------------------
      });
  }

  toggle(opt: number) {
    this.filtrosDesplegables[opt].expanded = !this.filtrosDesplegables[opt].expanded;
  }

  selectTema(opt: any){
    if (this.ctrlTema.value != opt) {
      this.ctrlTema.setValue(opt);
    }
  }

  selectEspecialidad(opt: any){
    if (this.ctrlEspecialidad.value != opt) {
      this.ctrlEspecialidad.setValue(opt);
    }
  }

  searchItems() {
    this.loadingBuscar = true;
  
    
    let dataObtenida = this.listaOriginal;

    if (this.ctrlAnio.value) {
      dataObtenida = dataObtenida.filter((items: any)=> this.ctrlAnio.value === items.Año);
    }

    if (this.ctrlGrupo.value) {
      dataObtenida = dataObtenida.filter((items: any)=> this.ctrlGrupo.value === items['Grupo etario']);
    }

    if (this.ctrlTopico.value) {
      dataObtenida = dataObtenida.filter((items: any)=> this.ctrlTopico.value === items.Tópico);
    }

    if (this.ctrlTema.value) {
      dataObtenida = dataObtenida.filter((items: any)=> items['Condición clínica'].includes(this.ctrlTema.value));
    }

    if (this.ctrlEspecialidad.value) {
      dataObtenida = dataObtenida.filter((items: any)=> items.Especialidad.includes(this.ctrlEspecialidad.value));
    }

    if (this.ctrlBusqueda.value) {
      dataObtenida = dataObtenida.filter((items: any)=> items.Enunciado.includes(this.ctrlBusqueda.value))
    }

    this.listItemsBusqueda = dataObtenida.map((item: any, index: number) => ({
      ...item,
      orden: Math.floor(index / 10) + 1
    }));;
    this.orden = 1;
    console.log(this.listItemsBusqueda)
    this.loadingBuscar = false;
  }
}
