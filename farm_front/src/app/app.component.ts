import { Component, ViewChild } from '@angular/core';
import { BasemapComponent } from './basemap/basemap.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public sidebarLinks = [
    {
      path:'', 
      isActive: false, 
      label:'Pagina Inicial',
      icon: 'home',
      subSidebarLinks:[]
    },
    { 
      isActive: false,
      label: 'Cadastro',
      icon: 'add',
      subSidebarLinks:[
        {
          path:'create', 
          isActive: false, 
          label:'Novo Cadastro',
          icon: 'add',
        },
        {
          path:'draw', 
          isActive: false, 
          label:'Desenhar Circulo',
          icon: 'draw',
        }
      ]
    }
  ]
}
