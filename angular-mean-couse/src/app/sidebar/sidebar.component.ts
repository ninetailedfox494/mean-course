import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../shared/material-share';

@Component({
  selector: 'app-sidebar',
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
